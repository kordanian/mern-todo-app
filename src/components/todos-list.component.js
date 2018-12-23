import React, { Component } from 'react';

export default class ToDosList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        fetch('http://localhost:4000/todos')
            .then(response => response.json())
            .then(data => {
                this.setState({ data });
            });
    }

    render() {
        return (
            <div>
                <p>Welcome to ToDos List</p>
                <ul>
                    {
                        this.state.data.map(function (item, i) {
                            return <li key={i}>
                                <a href={'/edit/' + item._id} >
                                    {item.todo_description}
                                </a>
                                <br />
                                Responsible: {item.todo_responsible}
                                <br />
                                Priority: {item.todo_priority}
                                <br />
                                Completed: {item.todo_completed.toString()}
                                <br />
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}