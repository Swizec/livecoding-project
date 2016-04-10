
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

require('./axis.less');

class Axis extends Component {
    constructor(props) {
        super();

        this.axis = d3.svg.axis();

        this.updateD3(props);
    }

    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }

    updateD3(props) {
        this.axis
            .scale(props.scale)
            .orient(props.orient)
            .tickValues(props.data.map(props.value))
            .tickFormat(props.tickFormat)
            .ticks(props.data.length);
    }

    componentDidMount() { this.renderAxis(); }
    componentDidUpdate() { this.renderAxis(); }

    renderAxis() {
        let node = ReactDOM.findDOMNode(this);

        let axisNode = d3.select(node).call(this.axis),
            labels = axisNode.selectAll('text'),
            x = Math.sin(65)*20,
            y = Math.cos(65)*20;

        labels.style('text-anchor', 'left')
              //.attr('transform',
              //      `${labels.attr('transform') || ''} rotate(65) translate(${x}, ${y})`);
    }

    render() {
        let transform = `translate(${this.props.x}, ${this.props.y})`;

        return (
            <g className="axis" transform={transform}>
            </g>
        )
    }
}

Axis.defaultProps = {
    orient: 'bottom',
    value: (d) => d,
    tickFormat: (d) => d3.scale.linear().tickFormat()(d)
}

export default Axis;
