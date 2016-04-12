
import React, { Component } from 'react';

import { LabeledArc } from './Arc';

/* class Piechart extends Component {
   constructor() {
   super();

   this.pie = d3.layout.pie()
   .value((d) => d.value);
   }

   arcGenerator(d, i) {
   return (
   <LabeledArc key={`arc-${i}`}
   data={d}
   innerRadius={this.props.innerRadius}
   outerRadius={this.props.outerRadius}
   i={i} />
   );
   }

   render() {
   let pie = this.pie(this.props.data),
   translate = `translate(${this.props.x}, ${this.props.y})`;

   return (
   <g transform={translate}>
   {pie.map((d, i) => this.arcGenerator(d, i))}
   </g>
   )
   }
   } */

//28

const Piechart = ({x, y, innerRadius, outerRadius, data}) => {
    let pie = d3.layout.pie()
                .value((d) => d.value)(data),
        translate = `translate(${x}, ${y})`,
        colors = d3.scale.category10();

    return (
        <g transform={translate}>
            {pie.map((d, i) => (
                <LabeledArc key={`arc-${i}`}
                data={d}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                color={colors(i)} />))}
        </g>
    );
};

//16

export default Piechart;
