
import React, { Component } from 'react';
import d3 from 'd3';

import Piechart from '../Piechart';

class Dataviz extends Component {
    constructor() {
        super();

    }

    render() {
        let got_visa = this.props.data
                           .filter((d) => d.case_status == 'certified')
                           .length,
            didnt_get = this.props.data.length - got_visa;

        let translate = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={translate}>
                <Piechart outerRadius={120}
                          innerRadius={60}
                          x={0}
                          y={0}
                          data={[got_visa, didnt_get]} />
            <Piechart outerRadius={60}
            innerRadius={20}
            x={300}
            y={100}
            data={[10,20,40]} />
            </g>
        )
    }
};

export default Dataviz;
