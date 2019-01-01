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
            {' '}<Link id={props.todo._id} to="#" onClick={props.handleClick}>Delete</Link>
        </td>
        <td>
            <input
                name="todo_completed"
                type="checkbox"
                className="form-check-input"
                id={props.todo._id}
                checked={props.todo.todo_completed}
                onChange={props.onChangeTodoCompleted}
            />
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
    handleCheck = (e, key) => {
        e.preventDefault();
        const todo = {
            todo_description: this.state.data[key].todo_description,
            todo_responsible: this.state.data[key].todo_responsible,
            todo_priority: this.state.data[key].todo_priority,
            todo_completed: this.state.data[key].todo_completed
        };
        console.log(todo);
        axios.post(`http://localhost:4000/todos/update/${e.currentTarget.id}`, todo)
            .then(data => {
                if (data.status === 200) {
                    console.log(data.status);
                    this.setState({ isUpdated: true });
                } else {
                    console.log(data.status);
                    window.alert(data.status);
                }
            })
            .catch(error => {
                console.log(error);
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

    onChangeTodoCompleted = (event, key) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let { data } = this.state;
        data[key].todo_completed = value;
        this.setState({
            data
        })
        this.handleCheck(event, key);
    }

    todoList = () => {
        return this.state.data.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} handleClick={this.handleClick} onChangeTodoCompleted={e => this.onChangeTodoCompleted(e, i)} />;
        });
    }
    todoListBullet = () => {
        return this.state.data.map((item, i) => {
            return <TodoBullet item={item} key={i} handleClick={this.handleClick} />;
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
                            <th>Completed</th>
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