import React from 'react'

function Title({ children, color }) {
  return (
    <h1 className={`lead-text text-${color}`}>{children}</h1>
  );
}

export default Title;