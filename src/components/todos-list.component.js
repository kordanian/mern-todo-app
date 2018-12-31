import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>   |
            {' '}<Link id={props.todo._id} to="#" onClick={(e) => props.handleClick(e)}>Delete</Link>
        </td>
    </tr>
)
const TodoBullet = props => (
    <li key={props.i}>
        <a href={'/edit/' + props.item._id} >
            {props.item.todo_description}
        </a>
        <br />
        Responsible: {props.item.todo_responsible}
        <br />
        Priority: {props.item.todo_priority}
        <br />
        Completed: {props.item.todo_completed.toString()}
        <br />
        <a id={props.item._id} href="#" name={props.item._id} onClick={(e) => props.handleClick(e)}>
            Delete
        </a>
    </li>
)
export default class ToDosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:4000/todos')
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => {
                window.alert(error);
            });
    }

    handleClick = e => {
        e.preventDefault();       
        axios.post(`http://localhost:4000/todos/delete/${e.currentTarget.id}`)
            .then(data => {
                if (data.status === 200) {
                    window.alert('delete successful');
                    window.location.reload();
                } else {
                    window.alert(`status ${data.status}`);
                    window.location.reload();
                }
            })
            .catch(error => {
                window.alert(error);
            })
    }
    todoList = () => {
        return this.state.data.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} handleClick={this.handleClick} />;
        });
    }
    todoListBullet = () => {
        return this.state.data.map((item, i) => {
            return <TodoBullet item={item} i={i} handleClick={this.handleClick} />;
        });
    }

    render() {
        return (
            <div>
                <h3>ToDos List</h3>
                <table className="table table-striped" style={{ margin: '20px' }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
                <ul>
                    {this.todoListBullet()}
                </ul>
            </div>
        )
    }
}