import cn from 'classnames';
import React from 'react';

// BEGIN (write your solution here)
export default class BtnGroup extends React.Component {
  state = { active: null };

  render() {
    return (
      <div className="btn-group" role="group">
        {['left', 'right'].map((side) => (
          <button key={side} type="button"
            className={cn('btn', 'btn-secondary', side, { active: this.state.active === side })}
            onClick={() => this.setState({ active: side })}>
            {side === 'left' ? 'Left' : 'Right'}
          </button>
        ))}
      </div>
    );
  }
}
// END
