import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from '../Model/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks: Task[] = [];
  createTaskStatus: boolean = false;
  userId: string;

  theDate: any;
  title: string;
  description: string;

  constructor(private taskService: TaskService) {
    this.userId = localStorage.getItem("userId");
    this.theDate = new Date(Date.now());
  }

  ngOnInit(): void { 
    this.getTasks(parseInt(this.userId));
  }

  getTasks(userId: number) {
    this.taskService.getTasks(userId).subscribe(
      res => { 
        this.tasks = res;
      });
  }

  newTask() {
    this.createTaskStatus = true;
  }

  createTask() {
    var _task = new Task();

    _task.Date = this.theDate;
    _task.Title = this.title;
    _task.Description = this.description;
    _task.UserModelId = parseInt(this.userId); 

    this.taskService.createTask(_task).subscribe(
      res => {
        if (res == "successful") {
          this.getTasks(parseInt(this.userId));
          this.createTaskStatus = false;
          this.title = "";
          this.description = "";

        } else if (res == "err") {

        }
      });
  }

  closeModel() {
    this.createTaskStatus = false;
  }

}
