import * as React from "react";
import api from "../../api";
import { schemeCategory10 } from "d3";
import { HistogramConfig } from "../../d3/Histogram";
import { Histogram } from "../../components/Histogram";

export interface RevisionCountHistogramProps {
  language: string;
  header: string;
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
        margin: { left: 30, right: 30, top: 30, bottom: 30 },
        height: 500,
        width: 500,
        getX: d => d.revisionCount,
        getColor: _d => schemeCategory10[0],
        xMax: 100,
        binCount: 70
      }
    };
  }

  componentDidUpdate(prevProps: RevisionCountHistogramProps) {
    if (prevProps.language !== this.props.language) {
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
  }

  render() {
    return (
      <>
        <h3>{this.props.header}</h3>
        <Histogram
          data={this.state.data}
          config={this.state.config}
        ></Histogram>
      </>
    );
  }
}

export { RevisionCountHistogram };
