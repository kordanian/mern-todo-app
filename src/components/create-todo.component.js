import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class CreateToDo extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
            isUpdated: false
        })
    }

    onChangeTodoDescription = e => {
        this.setState({
            todo_description: e.target.value
        })
    }

    onChangeTodoResponsible = e => {
        this.setState({
            todo_responsible: e.target.value
        })
    }

    onChangeTodoPriority = e => {
        this.setState({
            todo_priority: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);
        const todo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        axios.post('http://localhost:4000/todos/add', todo)
            .then(data => {
                console.log(data);
                this.setState({ isUpdated: true });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let { 
            isUpdated,
            todo_description,
            todo_responsible,
            todo_priority,
            todo_completed
         } = this.state;
        if (isUpdated) {
            return <Redirect to='/' />
        }
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>
                            Description:
                        </label>
                        <input type="text"
                            className="form-control"
                            value={todo_description}
                            onChange={this.onChangeTodoDescription} />
                    </div>
                    <div className="form-group">
                        <label>
                            Responsible:
                        </label>
                        <input type="text"
                            className="form-control"
                            value={todo_responsible}
                            onChange={this.onChangeTodoResponsible} />
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio"
                            className="form-check-input"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Low"
                            checked={todo_priority === 'Low'}
                            onChange={this.onChangeTodoPriority} />
                        <label className="form-check-label">
                            Low
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio"
                            className="form-check-input"
                            name="priortyOptions"
                            id="priorityMedium"
                            value="Medium"
                            checked={todo_priority === 'Medium'}
                            onChange={this.onChangeTodoPriority} />
                        <label className="form-check-label">
                            Medium
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio"
                            className="form-check-input"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="High"
                            checked={todo_priority === 'High'}
                            onChange={this.onChangeTodoPriority} />
                        <label className="form-check-label">
                            High
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="create todo"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}