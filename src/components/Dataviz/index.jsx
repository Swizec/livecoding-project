
import React, { Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';

import Piechart from '../Piechart';

class Dataviz extends Component {
    constructor() {
        super();

    }

    cleanJobTitle(title) {
        title = title.replace(/[^a-z ]/gi, '');

        if (title.match(/consultant|specialist|expert|prof|advis|consult/)) {
            title = "consultant";
        }else if (title.match(/analyst|strateg|scien/)) {
            title = "analyst";
        }else if (title.match(/manager|associate|train|manag|direct|supervis|mgr|chief/)) {
            title = "manager";
        }else if (title.match(/architect/)) {
            title = "architect";
        }else if (title.match(/lead|coord/)) {
            title = "lead";
        }else if (title.match(/eng|enig|ening|eign/)) {
            title = "engineer";
        }else if (title.match(/program/)) {
            title = "programmer";
        }else if (title.match(/design/)) {
            title = "designer";
        }else if (title.match(/develop|dvelop|develp|devlp|devel|deelop|devlop|devleo|deveo/)) {
            title = "developer";
        }else if (title.match(/tester|qa|quality|assurance|test/)) {
            title = "tester";
        }else if (title.match(/admin|support|packag|integrat/)) {
            title = "administrator";
        }else{
            title = "other";
        }

        return title;
    }

    titleSalary(d, title) {
        return this.cleanJobTitle(d.job_title) == title
                                                ? d.base_salary
                                                : NaN;
    }

    render() {
        let got_visa = this.props.data
                           .filter((d) => d.case_status == 'certified')
                           .length,
            didnt_get = this.props.data.length - got_visa;

        let translate = `translate(${this.props.x}, ${this.props.y})`;

        let realData = [{value: got_visa, label: "Win"},
                        {value: didnt_get, label: "Fail"}];

        let jobTitles = _.groupBy(this.props.data,
                                  (d) => this.cleanJobTitle(d.job_title)),
            pieData = Object.keys(jobTitles)
                            .map((k) => { return {
                                value: jobTitles[k].length,
                                label: k
                            }});

        console.log("programmer",
                    d3.mean(this.props.data,
                            (d) => this.titleSalary(d, 'programmer')));

        console.log("developer",
                    d3.mean(this.props.data,
                            (d) => this.titleSalary(d, 'developer')));

        console.log("engineer",
                    d3.mean(this.props.data,
                            (d) => this.titleSalary(d, 'engineer')));



        return (
            <g transform={translate}>
                <Piechart outerRadius={120}
                          innerRadius={60}
                          x={0}
                          y={0}
                          data={realData} />
                <Piechart outerRadius={300}
                          innerRadius={150}
                          x={300}
                          y={100}
                          data={pieData} />
            </g>
        )
    }
};

export default Dataviz;
