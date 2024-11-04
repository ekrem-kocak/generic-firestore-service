import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { Todo, TodoService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todo: Todo = { name: '', isDone: false, createdTime: Date.now() };

  private readonly todoService = inject(TodoService);

  todos$ = this.todoService.getSnapshotChanges((ref) =>
    ref.orderBy('createdTime', 'desc')
  );

  async submit() {
    this.todoService
      .add(this.todo)
      .pipe(take(1))
      .subscribe({
        next: () => {
          console.warn('success');
          this.todo = { ...this.todo, name: '', isDone: false };
        },
        error: () => {
          console.error('error');
        },
      });
  }

  updateTodo(todo: Todo) {
    this.todoService.update(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.delete(todo);
  }
}
