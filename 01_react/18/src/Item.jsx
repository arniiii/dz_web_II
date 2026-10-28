import React from 'react';

// BEGIN (write your solution here)
export default function Item({ task, onClick }) {
  const link = <a href="#" className="todo-task" onClick={(event) => {
    event.preventDefault();
    onClick(task);
  }}>{task.text}</a>;
  return (
    <div className="row">
      <div className="col-1">{task.id}</div>
      <div className="col">{task.state === 'finished' ? <s>{link}</s> : link}</div>
    </div>
  );
}
// END
