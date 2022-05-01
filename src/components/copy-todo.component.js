import React, { Component } from "react";
import axios from "axios";

export default class CreateTodo extends Component {

    copyTodo = this.copyTodo.bind(this);
    
    // this.
    state = {
      activity: "",
    };
  // }

  copyTodo(e) {
    this.setState({
      activity: e.target.value,
    });
  }

  componentDidMount() {

    axios.get('http://localhost:5000/todos/')
      .then(response => {
        this.setState({ todos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  copyTodo(id) {
    axios.create('http://localhost:5000/todos/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      todos: this.state.todos.filter(el => el._id !== id)
    })
  }

  todoList() {
    return this.state.todos.map(currenttodo => {
      return <Todo todo={currenttodo} 
      copyTodo={this.copyTodo} key={currenttodo._id}

      />;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Todos</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
          {/* just to put the last line under */} <tbody><a> </a></tbody>
        </table>
      </div>
    )
  }
}
