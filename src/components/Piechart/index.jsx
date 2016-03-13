
import React, { Component } from 'react';

import Arc from './Arc';

class Piechart extends Component {
    constructor() {
        super();

        this.pie = d3.layout.pie()
                     .value((d) => d);
    }

    render() {
        let pie = this.pie(this.props.data),
            translate = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={translate}>
                {pie.map((d, i) =>
                    (<Arc data={d}
                        innerRadius={this.props.innerRadius}
                        outerRadius={this.props.outerRadius}
                        i={i}
                        key={`arc-${i}`} />)
                 )}
            </g>
        )
    }
}

export default Piechart;
