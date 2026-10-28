import cn from 'classnames';
import React, { useState } from 'react';

const BtnGroup = () => {
  // BEGIN (write your solution here)
  const [active, setActive] = useState(null);
  return (
    <div className="btn-group" role="group">
      {['left', 'right'].map((side) => (
        <button key={side} type="button" className={cn('btn', 'btn-secondary', side, { active: side === active })}
          onClick={() => setActive(side)}>{side === 'left' ? 'Left' : 'Right'}</button>
      ))}
    </div>
  );
  // END
};

export default BtnGroup;