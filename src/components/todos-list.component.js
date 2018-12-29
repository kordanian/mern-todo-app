import React, { Component } from 'react';
import axios from 'axios';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default class ToDosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modalIsOpen: false
        };
        fetch('http://localhost:4000/todos')
            .then(response => response.json())
            .then(data => {
                this.setState({ data });
            });
    } 

    handleClick = e => {
        e.preventDefault();
        let that = this;
        axios.post(`http://localhost:4000/todos/delete/${e.currentTarget.id}`)
            .then(data => {
                if (data.status === 200) {
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

    render() {
        return (
            <div>
                  <p>Welcome to ToDos List</p>
                <ul>
                    {
                        this.state.data.map((item, i) => {
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
                                <a id={item._id} href="#" name={item._id} onClick={(e) => this.handleClick(e)}>
                                    Delete
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}