import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateToDo from './components/create-todo.component';
import EditToDo from './components/edit-todo.component';
import ToDoList from './components/todos-list.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h1>Mern stack todo app</h1>
          <Route path="/" exact component={ToDoList} />
          <Route path="/edit/:id" component={EditToDo} />
          <Route path="/create" component={CreateToDo} />
        </div>
      </Router>
    );
  }
}

export default App;
