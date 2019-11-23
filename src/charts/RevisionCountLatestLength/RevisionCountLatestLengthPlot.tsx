import * as React from "react";
import { ScatterPlot } from "../ScatterPlot";
import apiService from "../../api";
import { calculateAxisFromMax } from "../util";

class RevisionCountLatestLength extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
      data: [],
      chartConfig: {
        getX: (d: any) => d.latestLength,
        getY: (d: any) => d.revisionCount,
        margin: { left: 30, right: 30, top: 30, bottom: 30 },
        height: 500,
        width: 500
      }
    };
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.language !== this.props.language) {
      apiService
        .getRevisionCountVsLatestLength({ language: this.props.language })
        .then((response: any) => {
          const data = response.data.map((res: any) => ({
            ...res,
            language: this.props.language
          }));
          this.setState({
            loaded: true,
            data: data,
            chartConfig: {
              ...this.state.chartConfig,
              xMax: calculateAxisFromMax(response.meta.maxLatestLength),
              yMax: calculateAxisFromMax(response.meta.maxRevisionCount)
            }
          });
        });
    }
  }

  render() {
    return (
      <ScatterPlot data={this.state.data} config={this.state.chartConfig} />
    );
  }
}

export default RevisionCountLatestLength;
