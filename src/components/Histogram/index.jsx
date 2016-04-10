
import React, { Component } from 'react';
import d3 from 'd3';

import Bar from './Bar';
import Axis from './Axis';

class Histogram extends Component {
    constructor() {
        super();

        this.histogram = d3.layout.histogram();
        this.xScale = d3.scale.linear();
        this.yScale = d3.scale.linear();
        this.axis = d3.svg.axis()
                      .scale(this.xScale)
                      .orient('bottom');
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
            .range([0+props.margin.left,
                    props.width-props.margin.right]);

        if (renderData.length) {
            let barWidth = this.xScale(renderData[1].dx),
                [start, end] = this.xScale.range();

            this.xScale.range([start, end-barWidth]);
        }

        this.yScale
            .domain([d3.min(renderData, (d) => d.y),
                     d3.max(renderData, (d) => d.y)])
            .range([0,
                    props.height-props.margin.top-props.margin.bottom]);
    }

    renderBar(d, i) {
        return (
            <Bar x={this.xScale(d.x)}
                 y={this.props.height-this.yScale(d.y)-this.props.margin.bottom}
                 height={this.yScale(d.y)}
                 width={this.xScale(d.dx)}
                 key={`bar-${i}`} />
        )
    }

    salaryFormat(d) {
        let val = d3.scale.linear().tickFormat()(d/1000);

        return `\$${val}k`;
    }

    render() {
        let renderData = this.histogram(this.props.data),
            translate = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g transform={translate}>
                <text x="0" y="20" textAnchor="start"
                      className="lead">{this.props.title}</text>
                {renderData.map((d, i) => this.renderBar(d, i))}
            <Axis {...this.props}
                  data={renderData}
                  scale={this.xScale}
                  x={0}
                  y={this.props.height-20}
                  value={(d) => d.x}
                  tickFormat={this.salaryFormat}/>
            </g>
        );
    }
}

Histogram.defaultProps = {
    value: (d) => d,
    margin: {
        top: 25, right: 0, bottom: 20, left: 0
    }
}

export default Histogram;
