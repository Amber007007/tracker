import React, { Component } from "react";
import axios from "axios";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeActivity = this.onChangeActivity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: props.match.params.id,
      activity: "",
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/todos/${this.state.id}`).then((res) => {
      const activity = res.data.activity;
      this.setState({
        activity,
      })
      console.log(res)
    });
  }
  

  onChangeActivity(e) {
    this.setState({
      activity: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const activityvar = {
      activity: this.state.activity,
    };

    console.log(activityvar);

    axios.post(`http://localhost:5000/todos/update/${this.state.id}`, activityvar).then((res) => {
      window.location = "/";
    });
  }

  render() {
    return (
      <div>
        <h3>Edit Task</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>New Task: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.activity}
              onChange={this.onChangeActivity}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Update Activity Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
