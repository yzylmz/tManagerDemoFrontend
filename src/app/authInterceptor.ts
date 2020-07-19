import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";

import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) { 
    if (localStorage.getItem("authorization")) { 
      const clonedRequest = req.clone({
        headers: req.headers.set(
          "Authorization",
          localStorage.getItem("authorization")
        )
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}