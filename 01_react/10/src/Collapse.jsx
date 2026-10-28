import React from 'react';
import cn from 'classnames';

// BEGIN (write your solution here)
export default class Collapse extends React.Component {
  state = { opened: this.props.opened ?? true };

  render() {
    const { opened } = this.state;
    return (
      <div>
        <p>
          <a className="btn btn-primary" data-bs-toggle="collapse" href="#" role="button"
            aria-expanded={opened} onClick={(event) => {
              event.preventDefault();
              this.setState(({ opened: value }) => ({ opened: !value }));
            }}>Link with href</a>
        </p>
        <div className={cn('collapse', { show: opened })}>
          <div className="card card-body">{this.props.text}</div>
        </div>
      </div>
    );
  }
}
// END
