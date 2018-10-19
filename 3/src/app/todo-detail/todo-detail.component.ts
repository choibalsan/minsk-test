import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'todo-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent {
  @Input() item: Todo;
  @Output() deleted = new EventEmitter<Todo>();


  delete() {
    this.deleted.emit(this.item);
  }
}
