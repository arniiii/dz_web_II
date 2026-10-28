import cn from 'classnames';
import React from 'react';

// BEGIN (write your solution here)
export default function Alert({ text, type }) {
  return <div className={cn('alert', `alert-${type}`)} role="alert">{text}</div>;
}
// END
