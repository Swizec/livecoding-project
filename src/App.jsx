
import React, { Component } from 'react';
import d3 from 'd3';

import Dataviz from './components/Dataviz';

class App extends Component {
    constructor() {
        super();

        this.state = {rawData: []};
    }

    componentWillMount() {
        let format = d3.time.format('%m/%d/%Y');

        d3.csv('/data/h1bs.csv')
          .row((d) => { return {
              base_salary: d['base salary'] && Number(
                  d['base salary'].replace(',', '')
              ),
              case_status: d['case status'],
              employer: d['employer'],
              job_title: d['job title'],
              start_date: d['start date'] && format.parse(d['start date']),
              submit_date: d['submit date'] && format.parse(d['submit date'])
          }})
          .get((err, rows) => {
              if (err) console.error(err);

              let rawData = rows.filter((d) =>
                  d.base_salary
                  && d.start_date
                  && d.submit_date
              );

              this.setState({rawData: rawData});
          });
    }

    render() {
        let data = this.state.rawData;

        return (
            <svg width="800" height="600">
                <Dataviz data={data}
            x={200}
            y={200} />
            </svg>
        );
    }
}

export default App;
