import * as React from "react";
import api from "../api";
import { HistogramConfig } from "../d3/Histogram";
import { Histogram } from "../components/D3Components";
import { schemeCategory10 } from "d3";
import { DEFAULT_CONFIG } from "./util";

export interface TextLengthHistogramProps {
  language: string;
}

interface ChartData {
  id: string;
  language: string;
  textLength: number;
}

type ChartConfig = HistogramConfig<ChartData>;

const INITIAL_CONFIG: ChartConfig = {
  ...DEFAULT_CONFIG,
  title: "Distribution of Article Length",
  xLabel: "Article Length",
  yLabel: "Count",
  getX: d => d.textLength,
  getColor: _d => schemeCategory10[2],
  xMax: 100,
  binCount: 70
};

export const TextLengthHistogram: React.FC<TextLengthHistogramProps> = props => {
  const [config, setConfig] = React.useState(INITIAL_CONFIG);
  const [data, setData] = React.useState<ChartData[]>([]);

  React.useEffect(() => {
    if (props.language !== "") {
      api
        .getRevisionsField({
          language: props.language,
          field: "textLength"
        })
        .then(response => {
          setConfig(state => ({
            ...state,
            xMax: response.meta.maxTextLength
          }));
          setData(response.data as any);
        });
    }
  }, [props.language, setConfig, setData]);

  return <Histogram data={data} config={config} />;
};
