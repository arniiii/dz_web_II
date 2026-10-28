import { uniqueId } from 'lodash';
import React from 'react';
import Item from './Item.jsx';

// BEGIN (write your solution here)
export default class TodoBox extends React.Component {
  state = { text: '', tasks: [] };

  remove = (id) => this.setState(({ tasks }) => ({ tasks: tasks.filter((task) => task.id !== id) }));

  add = (event) => {
    event.preventDefault();
    const task = { id: uniqueId(), text: this.state.text };
    this.setState(({ tasks }) => ({ text: '', tasks: [task, ...tasks] }));
  };

  render() {
    return (
      <div>
        <div className="mb-3">
          <form className="d-flex" onSubmit={this.add}>
            <div className="me-3"><input type="text" value={this.state.text} required className="form-control"
              placeholder="I am going..." onChange={(event) => this.setState({ text: event.target.value })} /></div>
            <button type="submit" className="btn btn-primary">add</button>
          </form>
        </div>
        {this.state.tasks.map((task) => <Item key={task.id} task={task} onRemove={this.remove} />)}
      </div>
    );
  }
}
// END
