import React from 'react';

// BEGIN (write your solution here)
export default function ListGroup({ children }) {
  return (
    <ul className="list-group">
      {React.Children.map(children, (child) => <li className="list-group-item">{child}</li>)}
    </ul>
  );
}
// END
