import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


export interface Todo {
  id?: string;
  task: string;
  description: string;
  date: Date;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;
  
  editingTodo: Todo; //Todo that we store when we edit a todo
  editing: boolean; //Boolean that checks if some todo is being edited
  editMenuOpen: boolean; // Says if the edit menu is open
  
  
  @Input()
  todoTitleInput:string;
  @Input()
  todoDescInput:string;
  
  constructor(private afs:AngularFirestore){
    this.editMenuOpen = false;
    this.editing = false;
    this.editingTodo;
    this.todoCollectionRef = this.afs.collection<Todo>('todos');
    this.todo$ = this.todoCollectionRef.snapshotChanges().map(actions =>{
      return actions.map(action =>{
        const data = action.payload.doc.data() as Todo;
        const id = action.payload.doc.id;
        return {id, ...data}
      })
    })
    
  }
  
  addTodo(todoTitle:string, todoDesc:string){
    if(todoTitle){
      if(!todoDesc){todoDesc = ""}
      this.todoCollectionRef.add({task: todoTitle, description: todoDesc, date: new Date()});
    }
    this.emptyFields();
  }
  
  editTodo(todo:Todo){
    this.todoTitleInput = todo.task;
    this.todoDescInput = todo.description;
    this.editingTodo = todo;
    this.editing = true;
  }
  
  updateTodo(todo: Todo,newTitle:string, newDesc:string){
    this.editing = false;
    this.todoCollectionRef.doc(todo.id).update({task:newTitle,description: newDesc})
    this.emptyFields();
  }
  
  deleteTodo(todo: Todo){
    if(this.editing && this.editingTodo.id == todo.id){
      this.editing = false;
      this.emptyFields();
    }
    this.todoCollectionRef.doc(todo.id).delete();
    
  }
  
  emptyFields(){
    this.todoTitleInput = "";
    this.todoDescInput = "";
  }
  

  
}
