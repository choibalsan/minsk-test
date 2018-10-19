import { Component, OnInit } from '@angular/core';
import { TodoDataService } from "../todo-data.service";

@Component({
  selector: 'todo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoTitle = '';

  constructor(protected service: TodoDataService) {
  }

  ngOnInit() {
  }

  addTodo() {
    this.service.addTodo(this.todoTitle);
    this.todoTitle = '';
  }

  deleteTodo(id: number) {
    this.service.deleteTodo(id);
  }
}
