import React from 'react';

// BEGIN (write your solution here)
const Card = ({ children }) => <div className="card">{children}</div>;
Card.Body = ({ children }) => <div className="card-body">{children}</div>;
Card.Title = ({ children }) => <h4 className="card-title">{children}</h4>;
Card.Text = ({ children }) => <p className="card-text">{children}</p>;
export default Card;
// END
