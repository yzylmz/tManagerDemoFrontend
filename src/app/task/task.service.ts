import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../Model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(userId: number): Observable<Task[]> {
    return this.http.post<Task[]>(environment.apiUrl + "/user/gettasks", userId);
  }

  createTask(task: Task): Observable<string> {
    return this.http.post<string>(environment.apiUrl + "/user/createtask", task);
  }
}
