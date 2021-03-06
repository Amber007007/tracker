import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
  <tr className="d-flex">
    <td  className='col-10'>{props.todo.activity}</td>
    <td className='col-2' style={{textAlign:"right"}}>
      <button onClick={() => { props.deleteTodo(props.todo._id) }} >Delete</button>
      <button onClick={() => { props.copyTodo(props.todo.activity) }} >Copy</button>
      <Link to={`/update/${props.todo._id}`}><button type="button">Edit</button></Link>
    </td>
  </tr>
)

export default class TodosList extends Component {
  // constructor(props) {
  //   super(props);

    // this.
    deleteTodo = this.deleteTodo.bind(this)

    // this.
    state = {todos: []};
  // }

  componentDidMount() {
    // // this is for testing
    // this.setState({
    //   todos: [{activity:'t1'},{activity:'t2'},{activity:'t3'}]
    // })
    axios.get('http://localhost:5000/todos/')
      .then(response => {
        this.setState({ todos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTodo(id) {
    axios.delete('http://localhost:5000/todos/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      todos: this.state.todos.filter(el => el._id !== id)
    })
  }


  copyTodo(activity){
	
    const activityvar = {
          activity: activity,
        };
    
        axios.post("http://localhost:5000/todos/add", activityvar).then((res) => {
          window.location = "/";
        });
    
    }

  todoList() {
    return this.state.todos.map(currenttodo => {
      return <Todo todo={currenttodo} 
      deleteTodo={this.deleteTodo} key={currenttodo._id}
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