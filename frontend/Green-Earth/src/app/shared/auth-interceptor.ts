import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth-service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authservice:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        const token = this.authservice.getToken();
        if(!token)
        {
            return next.handle(req);
        }
        const authRequest = req.clone({
            headers:req.headers.set("authorization",token)
        })
        return next.handle(authRequest);

    }
    }
    
