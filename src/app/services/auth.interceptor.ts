import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
   
    constructor(private login: LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.login.getToken();
        
        console.log("AuthInterceptor token: ", token);

        // Check for the token and clone the request to add the header
        if (token != null) {
            const authRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Handle the *new, cloned* request
            return next.handle(authRequest);
        }
        // If no token, handle the original request
        return next.handle(req);
    }
    
}

export const authInterceptorProviders = [
    {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]