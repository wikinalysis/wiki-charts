import * as React from "react";
import api from "../api";
import { TimeSeriesConfig } from "../d3/TimeSeries";
import { TimeSeries } from "../components/TimeSeries";
import { schemeCategory10 } from "d3";
import { DEFAULT_CONFIG } from "./util";

export interface LastEditedHistogramProps {
  language: string;
}

interface LastEditedHistogramState {
  data: { id: string; language: string; createdAt: string }[];
  config: TimeSeriesConfig<{
    id: string;
    language: string;
    createdAt: string;
  }>;
}

class LastEditedHistogram extends React.Component<
  LastEditedHistogramProps,
  LastEditedHistogramState
> {
  constructor(props: LastEditedHistogramProps) {
    super(props);
    this.state = {
      data: [],
      config: {
        ...DEFAULT_CONFIG,
        getX: d => d.createdAt,
        getColor: _d => schemeCategory10[1],
        xMax: "2000-01-01T00:00:00Z",
        xMin: "2020-01-01T00:00:00Z"
      }
    };
  }
  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps: LastEditedHistogramProps) {
    if (prevProps.language !== this.props.language) {
      this.update();
    }
  }

  update = () => {
    if (this.props.language !== "") {
      api
        .getRevisionsField({
          language: this.props.language,
          field: "createdAt"
        })
        .then(response => {
          this.setState({
            data: response.data as any,
            config: {
              ...this.state.config,
              xMin: response.meta.minCreatedAt,
              xMax: response.meta.maxCreatedAt
            }
          });
        });
    }
  };

  render() {
    return (
      <TimeSeries
        data={this.state.data}
        config={this.state.config}
      ></TimeSeries>
    );
  }
}

export { LastEditedHistogram };
