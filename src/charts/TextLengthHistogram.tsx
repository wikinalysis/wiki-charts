import * as React from "react";
import api from "../api";
import { HistogramConfig } from "../d3/Histogram";
import { Histogram } from "../components/Histogram";
import { schemeCategory10 } from "d3";
import { DEFAULT_CONFIG } from "./util";

export interface TextLengthHistogramProps {
  language: string;
}

interface TextLengthHistogramState {
  data: { id: string; language: string; textLength: number }[];
  config: HistogramConfig<{ id: string; language: string; textLength: number }>;
}

class TextLengthHistogram extends React.Component<
  TextLengthHistogramProps,
  TextLengthHistogramState
> {
  constructor(props: TextLengthHistogramProps) {
    super(props);
    this.state = {
      data: [],
      config: {
        ...DEFAULT_CONFIG,
        getX: d => d.textLength,
        getColor: _d => schemeCategory10[2],
        xMax: 100,
        binCount: 70
      }
    };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps: TextLengthHistogramProps) {
    if (prevProps.language !== this.props.language) {
      this.update();
    }
  }

  update = () => {
    if (this.props.language !== "") {
      api
        .getRevisionsField({
          language: this.props.language,
          field: "textLength"
        })
        .then(response => {
          this.setState({
            data: response.data as any,
            config: { ...this.state.config, xMax: response.meta.maxTextLength }
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

export { TextLengthHistogram };
