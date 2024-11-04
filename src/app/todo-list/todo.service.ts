import { Injectable } from '@angular/core';
import { FireStoreService } from '../firestore.service';

export interface Todo {
  id?: string;
  name: string;
  isDone: boolean;
  createdTime: number;
}

@Injectable({ providedIn: 'root' })
export class TodoService extends FireStoreService<Todo> {
  constructor() {
    super('todos');
  }
}
