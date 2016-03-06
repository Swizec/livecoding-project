
import React, { Component } from 'react';
import d3 from 'd3';

import Arc from './Arc';

class Dataviz extends Component {
    constructor() {
        super();

        this.pie = d3.layout.pie()
                     .value((d) => d);

        this.arc = d3.svg.arc()
                     .outerRadius(100)
                     .innerRadius(50);
    }

    render() {
        let got_visa = this.props.data
                           .filter((d) => d.case_status == 'certified')
                           .length,
            didnt_get = this.props.data.length - got_visa;

        let pie = this.pie([got_visa, didnt_get]),
            translate = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={translate}>
                {pie.map((d, i) =>
                    (<Arc arc={this.arc(d)}
                          i={i}
                          key={`arc-${i}`} />)
                 )}
            </g>
        )
    }
};

export default Dataviz;
