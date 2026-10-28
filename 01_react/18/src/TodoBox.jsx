import axios from 'axios';
import React from 'react';
import update from 'immutability-helper';
import Item from './Item.jsx';
import routes from './routes.js';

// BEGIN (write your solution here)
export default class TodoBox extends React.Component {
  state = { text: '', tasks: [] };

  async componentDidMount() {
    const { data } = await axios.get(routes.tasksPath());
    this.setState({ tasks: data });
  }

  add = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(routes.tasksPath(), { text: this.state.text });
    this.setState(({ tasks }) => ({ text: '', tasks: [data, ...tasks] }));
  };

  toggle = async (task) => {
    const path = task.state === 'active' ? routes.finishTaskPath(task.id) : routes.activateTaskPath(task.id);
    const { data } = await axios.patch(path);
    this.setState(({ tasks }) => ({ tasks: update(tasks, { [tasks.findIndex((item) => item.id === task.id)]: { $merge: data } }) }));
  };

  render() {
    return (
      <div>
        <div className="mb-3">
          <form className="todo-form mx-3" onSubmit={this.add}>
            <div className="d-flex col-md-3">
              <input type="text" value={this.state.text} required className="form-control me-3" placeholder="I am going..."
                onChange={(event) => this.setState({ text: event.target.value })} />
              <button type="submit" className="btn btn-primary">add</button>
            </div>
          </form>
        </div>
        {['active', 'finished'].map((state) => {
          const tasks = this.state.tasks.filter((task) => task.state === state);
          return tasks.length > 0 && <div key={state} className={`todo-${state}-tasks`}>
            {tasks.map((task) => <Item key={task.id} task={task} onClick={this.toggle} />)}
          </div>;
        })}
      </div>
    );
  }
}
// END
