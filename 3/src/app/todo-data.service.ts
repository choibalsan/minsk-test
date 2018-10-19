import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const TODOS_KEY = 'mytodolist_items';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  private lastId = 0;

  todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(@Inject(LOCAL_STORAGE) private readonly storage: StorageService) {
    const plainItems = this.getTodos();
    this.todos.next(plainItems);
  }

  addTodo(title = ''): void {
    const newTodo = new Todo(this.lastId, title);
    this.lastId++;

    const plainItems = this.getTodos();
    plainItems.push(newTodo);
    this.todos.next(plainItems);
    this.saveTodos(plainItems);
  }

  deleteTodo(id): void {
    const plainItems = this.getTodos();
    const newItems = plainItems.filter(t => t.id !== id);
    this.todos.next(newItems);
    this.saveTodos(newItems);
  }

  getTodos(): Todo[] {
    return this.storage.get(TODOS_KEY) || [];
  }

  saveTodos(todos: Todo[]): void {
    this.storage.set(TODOS_KEY, todos);
  }
}
