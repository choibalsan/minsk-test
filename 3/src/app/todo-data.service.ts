import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Todo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  lastId = 0;

  todos: Observable<Todo[]> = new Observable<Todo[]>();

  constructor() {
  }

  addTodo(title = ''): void {

  }

  deleteTodo(id): void {

  }
}
