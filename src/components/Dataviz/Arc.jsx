
import React from 'react';
import d3 from 'd3';

let colors = d3.scale.category10();

const Arc = ({arc, i}) => (
    <path d={arc}
          style={{fill: colors(i)}}></path>
);

export default Arc;
