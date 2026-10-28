import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import React from 'react';

// BEGIN (write your solution here)
export default class Component extends React.Component {
  state = { entries: [] };

  add = (step) => {
    const id = uniqueId();
    this.setState(({ entries }) => ({
      entries: [{ id, value: get(entries, [0, 'value'], 0) + step }, ...entries],
    }));
  };

  render() {
    const { entries } = this.state;
    return (
      <div>
        <div className="btn-group font-monospace" role="group">
          <button type="button" className="btn btn-outline-success" onClick={() => this.add(1)}>+</button>
          <button type="button" className="btn btn-outline-danger" onClick={() => this.add(-1)}>-</button>
        </div>
        {entries.length > 0 && <div className="list-group">
          {entries.map(({ id, value }) => (
            <button key={id} type="button" className="list-group-item list-group-item-action"
              onClick={() => this.setState(({ entries: current }) => ({ entries: current.filter((entry) => entry.id !== id) }))}>
              {value}
            </button>
          ))}
        </div>}
      </div>
    );
  }
}
// END
