import { HttpClient } from "@angular/common/http";
import { ExpressionType } from "@angular/compiler";
import { AuthModelSignup } from "./auth-model-signup";
import { AuthModelLogin } from "./auth-model";
import { AuthModelEmp } from "./auth-modelemp";
import { AuthModelAdmin } from "./auth-admin";
import { Injectable } from "@angular/core";
import { Subject, pipe } from "rxjs";
import { Router } from "@angular/router";
import { data, error } from "jquery";

@Injectable({providedIn:"root"})
export class AuthService
{
    private token: string;
    private curuser:string;
    private curuser_id:string;
    private cuid:string;

    private status: number;
    private msg: string;
    private authenticatedSub = new Subject<boolean>();
    private isAuthenticated = false;
    private logoutTimer: any;

    getIsAuthenticated(){
        return this.isAuthenticated;
    }
    getAuthenticatedSub(){
        return this.authenticatedSub.asObservable();
    }
    getToken(){
        return this.token;
    }
    getUser()
    {
        return this.curuser;
    }
    getCustomuserid()
    {
        return this.cuid;
    }
    getUserId()
    {
        return this.curuser_id;
    }
    constructor(private http:HttpClient, private router:Router ){}
    signupUser(name:string,phno:number, email:string, password:string)
    {
        const authData: AuthModelSignup = {name:name, phno:phno, email:email,password:password};
        console.log(authData);
        this.http.post('http://localhost:3000/sign-up',authData).subscribe((res:any)=>
        {
            console.log(res);
            
            this.router.navigate(['login']);
            

        })
    }

    loginUser(phno: number, password: string){
        const authData: AuthModelLogin = {phno: phno, password: password};

        this.http.post<{token:string, expiresIn:number, status:number, currentuser:string, currentuserid:string, cuid:string}>('http://localhost:3000/login/', authData)
            .subscribe((res)=> {
                console.log(res) 
                this.curuser_id = res.currentuserid;
                this.curuser = res.currentuser;
                this.cuid = res.cuid;
                this.token = res.token;
                
                if(this.token)
                {
                    
                    this.authenticatedSub.next(true);
                    this.isAuthenticated = true;
                    this.router.navigate(['user']);
                    this.logoutTimer = setTimeout(() => {
                        this.logout()
                        
                    }, res.expiresIn * 1000);
                    const now = new Date();
                    const expiresDate = new Date(now.getTime()+(res.expiresIn*1000));
                    this.storeLoginDetails(this.token, expiresDate, this.curuser, this.curuser_id, this.cuid);
                }
   
            }, (error) => {
                console.error('Login failed:', error.error.message);
                this.handleLoginError(error.error.message);
              }
            );
            
    }
    handleLoginError(errorMessage: string)
    {
        if (errorMessage === 'User not found') {
            // Alert for incorrect password or user not found
            return alert('User not found');
          } 
          else if(errorMessage === 'Password is incorrect')
          {
            return alert('Incorrect Password');

          }
          else {
            // Handle other types of errors if needed
            return alert('An error occurred. Please try again later.');
          }
    }

    logout()
    {
        this.token = '';
        this.isAuthenticated = false;
        this.authenticatedSub.next(false);
        this.router.navigate(['login']);
        clearTimeout(this.logoutTimer);
        this.clearLoginDetails();
    
    }

    storeLoginDetails(token:string, expirationDate:Date, currentuser:string, currentuserid:string, customuserid:string)
    {
        localStorage.setItem('usercur',currentuser);
        localStorage.setItem('usercurid',currentuserid);
        localStorage.setItem('cusuid',customuserid);
        localStorage.setItem('token',token);
        localStorage.setItem('expiresIn',expirationDate.toISOString());

    }
    clearLoginDetails()
    {
        
        localStorage.removeItem('usercur');
        localStorage.removeItem('usercurid');
        localStorage.removeItem('cusuid');  
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }
    getLocalStorageData()
    {
        const username = localStorage.getItem('usercur')
        const userid = localStorage.getItem('usercurid')
        const customuid = localStorage.getItem('cusuid')
        const token = localStorage.getItem('token');
        const expiresIn = localStorage.getItem('expiresIn');
        if(!token || !expiresIn)
        {
            return;
        }
        return{
            'token':token,
            'expiresIn': new Date(expiresIn),
            'user':username,
            'user_id':userid,
            'custom_uid':customuid
        }
    }
    
    authenticateFromLocalStorage(){
        const localStorageData = this.getLocalStorageData();
        if(localStorageData){
            const now = new Date();
            const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

            if(expiresIn > 0){
         this.curuser_id =  JSON.stringify(localStorageData.user_id);
         this.cuid =  JSON.stringify(localStorageData.custom_uid);


           this.curuser =  JSON.stringify(localStorageData.user);
                this.token = localStorageData.token;
                this.isAuthenticated = true;
                this.authenticatedSub.next(true);
                this.logoutTimer.setTimeout(expiresIn / 1000);
            }
        }
    }
    
//employee details

signupEmp(name:string, address:string, pincode:number, phno:number, email:string, password:string)
    {
        
        const authDataEmp: AuthModelEmp = {name:name, address:address,pincode:pincode,phno:phno,email:email, password:password};
        this.http.post('http://localhost:3000/signupemp',authDataEmp).subscribe(res=>
        {
            
             var obj: any ={"status": Boolean, "message":''};
             obj = res;
             if(obj.status === true)
             {
                alert("Successful registration")
                this.router.navigate(['emplogin']);
             }
             else if(obj.status === false)
             {
                alert("Registration failed")
             }
            
            
        })
     
    }
      // Employee login
    loginEmp(username: string, password: string){
        const authEmpData: AuthModelEmp = {
            name: username, password: password,
            address: "",
            pincode: 0,
            phno: 0,
            email: ""
        };


        this.http.post<{token:string, expiresIn:number, status:number, currentuser:string, currentuserid:string}>('http://localhost:3000/loginemp/', authEmpData)
            .subscribe(res => {
                this.curuser_id = res.currentuserid;
                this.curuser = res.currentuser;
                this.token = res.token;
                if(this.token)
                {
                    this.authenticatedSub.next(true);
                    this.isAuthenticated = true;
                    this.router.navigate(['emp']);
                    this.logoutTimer = setTimeout(() => {
                        this.logoutEmp()
                        
                    }, res.expiresIn * 1000);
                    const now = new Date();
                    const expiresDate = new Date(now.getTime()+(res.expiresIn*1000));
                    this.storeEmpLoginDetails(this.token, expiresDate, this.curuser, this.curuser_id);
                }
            })
    }
    
    logoutEmp()
    {
        this.token = '';
        this.isAuthenticated = false;
        this.authenticatedSub.next(false);
        this.router.navigate(['emplogin']);
        clearTimeout(this.logoutTimer);
        this.clearEmpLoginDetails();
    
    }

    storeEmpLoginDetails(token:string, expirationDate:Date, currentuser:string, currentuserid:string)
    {
        
        localStorage.setItem('usercur',currentuser)
        localStorage.setItem('usercurid',currentuserid);
        localStorage.setItem('token',token);
        localStorage.setItem('expiresIn',expirationDate.toISOString());

    }
    clearEmpLoginDetails()
    {
        localStorage.removeItem('usercur');
        localStorage.removeItem('usercurid');
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }
    getEmpLocalStorageData()
    {
        const username = localStorage.getItem('usercur')
        const userid = localStorage.getItem('usercurid')
        const token = localStorage.getItem('token');
        const expiresIn = localStorage.getItem('expiresIn');
        if(!token || !expiresIn)
        {
            return;
        }
        return{
            'token':token,
            'expiresIn': new Date(expiresIn),
            'user':username,
            'user_id':userid
        }
    }
    
    authenticateEmpFromLocalStorage(){
        const localStorageData = this.getEmpLocalStorageData();
        if(localStorageData){
            const now = new Date();
            const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

            if(expiresIn > 0){
         this.curuser_id =  JSON.stringify(localStorageData.user_id);

           this.curuser =  JSON.stringify(localStorageData.user);
                this.token = localStorageData.token;
                this.isAuthenticated = true;
                this.authenticatedSub.next(true);
                this.logoutTimer.setTimeout(expiresIn / 1000);
            }
        }
    }
 
    


//admin

loginAdmin(username: string, password: string){
    const authadminData: AuthModelAdmin = {name: username, password: password};

    this.http.post<{token:string, expiresIn:number, status:number, currentuser:string, currentuserid:string}>('http://localhost:3000/loginadmin/', authadminData)
        .subscribe(res => {
            console.log(res);
            
            this.curuser_id = res.currentuserid;
            console.log(this.curuser_id);
            this.curuser = res.currentuser;
            this.token = res.token;
            if(this.token)
            {
                this.authenticatedSub.next(true);
                this.isAuthenticated = true;
                this.router.navigate(['adminview']);
                this.logoutTimer = setTimeout(() => {
                    this.logoutAdmin()
                    
                }, res.expiresIn * 1000);
                const now = new Date();
                const expiresDate = new Date(now.getTime()+(res.expiresIn*1000));
                this.storeAdminLoginDetails(this.token, expiresDate, this.curuser, this.curuser_id);
            }
        })
}

logoutAdmin()
{
    this.token = '';
    this.isAuthenticated = false;
    this.authenticatedSub.next(false);
    this.router.navigate(['adminlogin']);
    clearTimeout(this.logoutTimer);
    this.clearAdminLoginDetails();

}

storeAdminLoginDetails(token:string, expirationDate:Date, currentuser:string, currentuserid:string)
    {
        
        localStorage.setItem('usercur',currentuser)
        localStorage.setItem('usercurid',currentuserid);
        localStorage.setItem('token',token);
        localStorage.setItem('expiresIn',expirationDate.toISOString());

    }
clearAdminLoginDetails()
    {
        localStorage.removeItem('usercur');
        localStorage.removeItem('usercurid');
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }

getAdminLocalStorageData()
{
    const username = localStorage.getItem('usercur')
        const userid = localStorage.getItem('usercurid')
        const token = localStorage.getItem('token');
        const expiresIn = localStorage.getItem('expiresIn');
        if(!token || !expiresIn)
        {
            return;
        }
        return{
            'token':token,
            'expiresIn': new Date(expiresIn),
            'user':username,
            'user_id':userid
        }
}

authenticateAdminFromLocalStorage(){
    const localStorageData = this.getAdminLocalStorageData();
        if(localStorageData){
            const now = new Date();
            const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

            if(expiresIn > 0){
         this.curuser_id =  JSON.stringify(localStorageData.user_id);
           this.curuser =  JSON.stringify(localStorageData.user);
                this.token = localStorageData.token;
                this.isAuthenticated = true;
                this.authenticatedSub.next(true);
                this.logoutTimer.setTimeout(expiresIn / 1000);
            }
        }

}
}