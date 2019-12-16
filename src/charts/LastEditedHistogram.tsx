import * as React from "react";
import api from "../api";
import { schemeCategory10 } from "d3";
import { TimeSeriesConfig } from "../d3/TimeSeries";
import { TimeSeries } from "../components/D3Components";
import { DEFAULT_CONFIG } from "./util";

export interface LastEditedHistogramProps {
  language: string;
}

interface ChartData {
  id: string;
  language: string;
  createdAt: string;
}

type ChartConfig = TimeSeriesConfig<ChartData>;

const INITIAL_CONFIG: ChartConfig = {
  ...DEFAULT_CONFIG,
  title: "Distribution of Last Edit Time",
  xLabel: "Most Recent Edit",
  yLabel: "Count",
  getX: d => d.createdAt,
  getColor: _d => schemeCategory10[1],
  xMax: "2000-01-01T00:00:00Z",
  xMin: "2020-01-01T00:00:00Z"
};

export const LastEditedHistogram: React.FC<LastEditedHistogramProps> = props => {
  const [config, setConfig] = React.useState(INITIAL_CONFIG);
  const [data, setData] = React.useState<ChartData[]>([]);

  React.useEffect(() => {
    if (props.language !== "") {
      api
        .getRevisionsField({
          language: props.language,
          field: "createdAt"
        })
        .then(response => {
          setConfig(state => ({
            ...state,
            xMin: response.meta.minCreatedAt,
            xMax: response.meta.maxCreatedAt
          }));
          setData(response.data as any);
        });
    }
  }, [props.language, setConfig, setData]);

  return <TimeSeries data={data} config={config} />;
};
