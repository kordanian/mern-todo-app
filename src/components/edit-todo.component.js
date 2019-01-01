import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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
    }
    componentDidMount() {
        axios.get(`http://localhost:4000/todos/${this.props.match.params.id}`)
            .then(response => {
                if (response) {
                    console.log('there is data');
                    let {
                        todo_priority,
                        todo_responsible,
                        todo_description,
                        todo_completed
                    } = response.data;
                    this.setState({
                        todo_priority, todo_responsible, todo_description, todo_completed
                    });
                }
            }
            )
            .catch(error => { window.alert(error); });
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

    onChangeTodoCompleted = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
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
        axios.post(`http://localhost:4000/todos/update/${this.props.match.params.id}`, todo)
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

    render() {
        let {
            isUpdated,
            todo_priority,
            todo_responsible,
            todo_description,
            todo_completed
        } = this.state;
        if (isUpdated) {
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
                    <div className="form-check" style={{marginTop:'10px'}}>
                        <input
                            name="todo_completed"
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={todo_completed}
                            onChange={this.onChangeTodoCompleted}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">Completed</label>
                    </div>
                    <div className="form-group" style={{marginTop:'20px'}}>
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