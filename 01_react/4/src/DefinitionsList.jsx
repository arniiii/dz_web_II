import React from 'react';

// BEGIN (write your solution here)
export default function DefinitionsList({ data }) {
  if (data.length === 0) return null;
  return (
    <dl>
      {data.map(({ id, dt, dd }) => (
        <React.Fragment key={id}>
          <dt>{dt}</dt>
          <dd>{dd}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
// END
