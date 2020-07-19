import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
 

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<string>(environment.apiUrl + "/user/login", { "username": username, "password": password });
  }
}
