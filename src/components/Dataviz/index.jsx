
import React, { Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';

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

        let exampleData = [{value: 10, label: "Ten"},
                           {value: 20, label: "Twenty"},
                           {value: 40, label: "Forty"}];

        let realData = [{value: got_visa, label: "Win"},
                        {value: didnt_get, label: "Fail"}];

        let jobTitles = _.groupBy(this.props.data,
                                  (d) => d.job_title),
            pieData = Object.keys(jobTitles)
                            .map((k) => { return {
                                value: jobTitles[k].length,
                                label: k
                            }});

        console.log(pieData.length);

        return (
            <g transform={translate}>
                <Piechart outerRadius={120}
                          innerRadius={60}
                          x={0}
                          y={0}
                          data={realData} />
                <Piechart outerRadius={300}
                          innerRadius={100}
                          x={300}
                          y={100}
                          data={pieData} />
            </g>
        )
    }
};

export default Dataviz;
