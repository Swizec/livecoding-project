
import React, { Component } from 'react';
import d3 from 'd3';

import Bar from './Bar';

class Histogram extends Component {
    constructor() {
        super();

        this.histogram = d3.layout.histogram();
        this.xScale = d3.scale.linear();
        this.yScale = d3.scale.linear();
    }

    componentWillMount() {
        this.updateD3(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }

    updateD3(props) {
        this.histogram.value(props.value);

        let renderData = this.histogram(props.data);

        this.xScale
            .domain([d3.min(renderData, (d) => d.x),
                     d3.max(renderData, (d) => d.x)])
            .range([0, props.width]);

        this.yScale
            .domain([d3.min(renderData, (d) => d.y),
                     d3.max(renderData, (d) => d.y)])
            .range([0, props.height]);
    }

    renderBar(d, i) {
        return (
            <Bar x={this.xScale(d.x)}
                 y={this.props.height-this.yScale(d.y)}
                 height={this.yScale(d.y)}
                 width={this.xScale(d.dx)}
                 key={`bar-${i}`} />
        )
    }

    render() {
        let renderData = this.histogram(this.props.data),
            translate = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={translate}>
                <rect x="0" y="0" width={this.props.width} height={this.props.height} style={{fill: 'white', stroke: 'lightgrey', strokeWidth: '1px'}} />
                {renderData.map((d, i) => this.renderBar(d, i))}
            </g>
        );
    }
}

Histogram.defaultProps = {
    value: (d) => d
}

export default Histogram;
