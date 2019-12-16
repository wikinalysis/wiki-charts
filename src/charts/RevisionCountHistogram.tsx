import * as React from "react";
import api from "../api";
import { schemeCategory10 } from "d3";
import { HistogramConfig } from "../d3/Histogram";
import { Histogram } from "../components/D3Components";
import { DEFAULT_CONFIG } from "./util";

export interface RevisionCountHistogramProps {
  language: string;
}

interface RevisionCountHistogramState {
  data: { id: string; language: string; revisionCount: number }[];
  config: HistogramConfig<{
    id: string;
    language: string;
    revisionCount: number;
  }>;
}

class RevisionCountHistogram extends React.Component<
  RevisionCountHistogramProps,
  RevisionCountHistogramState
> {
  constructor(props: RevisionCountHistogramProps) {
    super(props);
    this.state = {
      data: [],
      config: {
        ...DEFAULT_CONFIG,
        title: "Distribution of Edit Count",
        xLabel: "Total # of Edits",
        yLabel: "Count",
        getX: d => d.revisionCount,
        getColor: _d => schemeCategory10[0],
        xMax: 100,
        binCount: 70
      }
    };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps: RevisionCountHistogramProps) {
    if (prevProps.language !== this.props.language) {
      this.update();
    }
  }

  update = () => {
    if (this.props.language !== "") {
      api
        .getPagesField({
          language: this.props.language,
          field: "revisionCount"
        })
        .then(response => {
          this.setState({
            data: response.data as any,
            config: {
              ...this.state.config,
              xMax: response.meta.maxRevisionCount
            }
          });
        });
    }
  };

  render() {
    return (
      <Histogram data={this.state.data} config={this.state.config}></Histogram>
    );
  }
}

export { RevisionCountHistogram };
