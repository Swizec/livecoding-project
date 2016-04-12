
import React, { Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';

import Piechart from '../Piechart';
import Histogram from '../Histogram';

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


        let engineerData = this.props.data.filter(
            (d) => this.cleanJobTitle(d.job_title) == 'engineer'),

            programmerData = this.props.data.filter(
                (d) => this.cleanJobTitle(d.job_title) == 'programmer'),

            developerData = this.props.data.filter(
                (d) => this.cleanJobTitle(d.job_title) == 'developer');


        return (
            <g transform={translate}>
                <Piechart x={100} y={100} outerRadius={100} innerRadius={50}
                          data={[{value: 92-34, label: 'Code lines'},
                                 {value: 34, label: 'Empty lines'}]} />
            </g>
        )
        /* return (
           <g transform={translate}>
           <Histogram data={this.props.data}
           value={(d) => d.base_salary}
           x={0}
           y={0}
           width={400}
           height={200}
           title="All" />
           <Histogram data={engineerData}
           value={(d) => d.base_salary}
           x={450}
           y={0}
           width={400}
           height={200}
           title="Engineer" />
           <Histogram data={programmerData}
           value={(d) => d.base_salary}
           x={0}
           y={220}
           width={400}
           height={200}
           title="Programmer"/>
           <Histogram data={developerData}
           value={(d) => d.base_salary}
           x={450}
           y={220}
           width={400}
           height={200}
           title="Developer" />
           </g>
           ) */
    }
};

export default Dataviz;
