import React from 'react'

function Subtitle({ children, color }) {
  return (
    <h2 className={`medium-text text-${color}`}>{children}</h2>
  );
}

export default Subtitle;