import { HttpClient } from "@angular/common/http";
import { ExpressionType } from "@angular/compiler";
import { AuthModel } from "./auth-model";
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
    constructor(private http:HttpClient, private router:Router ){}
    signupUser(name:string,password:string)
    {
        const authData: AuthModel = {name:name,password:password};
        this.http.post('http://localhost:3000/sign-up',authData).subscribe(res=>
        {
            console.log(res);
        })
    }

    loginUser(username: string, password: string){
        const authData: AuthModel = {name: username, password: password};

        this.http.post<{token:string, expiresIn:number, message:string, status:number}>('http://localhost:3000/login/', authData)
            .subscribe((res)=> { 

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
                    this.storeLoginDetails(this.token, expiresDate);
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

    // loginUser(name:string,password:string)
    // {

    //     const authData: AuthModel = {name:name,password:password};
    //     this.http.post<{token:string,expiresIn:number}>('http://localhost:3000/login/',authData).subscribe(res=>{
    //         this.token=res.token;
    //         if(this.token)
    //         {
    //             this.authenticatedSub.next(true);
    //             this.isAuthenticated=true;
    //             this.router.navigate(['/']);
    //             this.logoutTimer = setTimeout(()=> {this.logout()}, res.expiresIn * 1000);
    //             const now = new Date();
    //             const expiresDate = new Date(now.getTime()+ (res.expiresIn * 1000));
    //             this.storeLoginDetails(this.token,expiresDate);
    //         }
    //     })
    // }
    logout()
    {
        this.token = '';
        this.isAuthenticated = false;
        this.authenticatedSub.next(false);
        this.router.navigate(['login']);
        clearTimeout(this.logoutTimer);
        this.clearLoginDetails();
    
    }

    storeLoginDetails(token:string, expirationDate:Date)
    {
        localStorage.setItem('token',token);
        localStorage.setItem('expiresIn',expirationDate.toISOString());

    }
    clearLoginDetails()
    {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }
    getLocalStorageData()
    {
        const token = localStorage.getItem('token');
        const expiresIn = localStorage.getItem('expiresIn');
        if(!token || !expiresIn)
        {
            return;
        }
        return{
            'token':token,
            'expiresIn': new Date(expiresIn)
        }
    }
    
    authenticateFromLocalStorage(){
        const localStorageData = this.getLocalStorageData();
        if(localStorageData){
            const now = new Date();
            const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

            if(expiresIn > 0){
                this.token = localStorageData.token;
                this.isAuthenticated = true;
                this.authenticatedSub.next(true);
                this.logoutTimer.setTimeout(expiresIn / 1000);
            }
        }
    }
    
//employee details

signupEmp(name:string, password:string)
    {
        
        const authDataEmp: AuthModelEmp = {name:name, password:password};
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
        const authEmpData: AuthModelEmp = {name: username, password: password};

        this.http.post<{token:string, expiresIn:number}>('http://localhost:3000/loginemp/', authEmpData)
            .subscribe(res => {
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
                    this.storeLoginDetails(this.token, expiresDate);
                }
            })
    }

    // loginUser(name:string,password:string)
    // {

    //     const authData: AuthModel = {name:name,password:password};
    //     this.http.post<{token:string,expiresIn:number}>('http://localhost:3000/login/',authData).subscribe(res=>{
    //         this.token=res.token;
    //         if(this.token)
    //         {
    //             this.authenticatedSub.next(true);
    //             this.isAuthenticated=true;
    //             this.router.navigate(['/']);
    //             this.logoutTimer = setTimeout(()=> {this.logout()}, res.expiresIn * 1000);
    //             const now = new Date();
    //             const expiresDate = new Date(now.getTime()+ (res.expiresIn * 1000));
    //             this.storeLoginDetails(this.token,expiresDate);
    //         }
    //     })
    // }
    logoutEmp()
    {
        this.token = '';
        this.isAuthenticated = false;
        this.authenticatedSub.next(false);
        this.router.navigate(['emplogin']);
        clearTimeout(this.logoutTimer);
        this.clearEmpLoginDetails();
    
    }

    storeEmpLoginDetails(token:string, expirationDate:Date)
    {
        localStorage.setItem('token',token);
        localStorage.setItem('expiresIn',expirationDate.toISOString());

    }
    clearEmpLoginDetails()
    {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }
    getEmpLocalStorageData()
    {
        const token = localStorage.getItem('token');
        const expiresIn = localStorage.getItem('expiresIn');
        if(!token || !expiresIn)
        {
            return;
        }
        return{
            'token':token,
            'expiresIn': new Date(expiresIn)
        }
    }
    
    authenticateEmpFromLocalStorage(){
        const localStorageData = this.getLocalStorageData();
        if(localStorageData){
            const now = new Date();
            const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

            if(expiresIn > 0){
                this.token = localStorageData.token;
                this.isAuthenticated = true;
                this.authenticatedSub.next(true);
                this.logoutTimer.setTimeout(expiresIn / 1000);
            }
        }
    }
 
    


//admin

loginAdmin(username: string, password: string){
    const authEmpData: AuthModelAdmin = {name: username, password: password};

    this.http.post<{token:string, expiresIn:number}>('http://localhost:3000/loginadmin/', authEmpData)
        .subscribe(res => {
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
                this.storeLoginDetails(this.token, expiresDate);
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
    this.clearEmpLoginDetails();

}

storeAdminLoginDetails(token:string, expirationDate:Date)
{
    localStorage.setItem('token',token);
    localStorage.setItem('expiresIn',expirationDate.toISOString());

}
clearAdminLoginDetails()
{
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
}
getAdminLocalStorageData()
{
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    if(!token || !expiresIn)
    {
        return;
    }
    return{
        'token':token,
        'expiresIn': new Date(expiresIn)
    }
}

authenticateAdminFromLocalStorage(){
    const localStorageData = this.getLocalStorageData();
    if(localStorageData){
        const now = new Date();
        const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

        if(expiresIn > 0){
            this.token = localStorageData.token;
            this.isAuthenticated = true;
            this.authenticatedSub.next(true);
            this.logoutTimer.setTimeout(expiresIn / 1000);
        }
    }
}

}










