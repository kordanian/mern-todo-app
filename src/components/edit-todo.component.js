import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class EditToDo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
            isUpdated: false
        }
        fetch(`http://localhost:4000/todos/${props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log('there is data');
                    this.setState(data);
                }
            });
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        })
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        })
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        fetch(`http://localhost:4000/todos/update/${this.props.match.params.id}`, {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.setState({
                isUpdated: true
            })
        });
    }

    render() {
        if (this.state.isUpdated === true) {
            return <Redirect to='/' />
        }
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>
                            Description:
                        </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription} />
                    </div>
                    <div className="form-group">
                        <label>
                            Responsible:
                        </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible} />
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio"
                            className="form-check-input"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Low"
                            checked={this.state.todo_priority === 'Low'}
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
                            checked={this.state.todo_priority === 'Medium'}
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
                            checked={this.state.todo_priority === 'High'}
                            onChange={this.onChangeTodoPriority} />
                        <label className="form-check-label">
                            High
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="update todo"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}