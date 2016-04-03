
import React from 'react';

const Bar = ({ x, y, width, height }) => (
    <rect x={x} y={y} width={width} height={height}
          style={{fill: 'steelblue'}} />
);

export default Bar;
