import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  createUser(username: string, password: string): Observable<string> {
    return this.http.post<string>(environment.apiUrl + "/user/register", { "username": username, "password": password });
  }

}
