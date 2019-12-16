import * as React from "react";
import api from "../api";
import { schemeCategory10 } from "d3";
import { HistogramConfig } from "../d3/Histogram";
import { Histogram } from "../components/D3Components";
import { DEFAULT_CONFIG } from "./util";

export interface RevisionCountHistogramProps {
  language: string;
}

interface ChartData {
  id: string;
  language: string;
  revisionCount: number;
}

type ChartConfig = HistogramConfig<ChartData>;

const INITIAL_CONFIG: ChartConfig = {
  ...DEFAULT_CONFIG,
  title: "Distribution of Edit Count",
  xLabel: "Total # of Edits",
  yLabel: "Count",
  getX: (d: any) => d.revisionCount,
  getColor: (_d: any) => schemeCategory10[0],
  xMax: 100,
  binCount: 70
};

export const RevisionCountHistogram: React.FC<RevisionCountHistogramProps> = props => {
  const [config, setConfig] = React.useState(INITIAL_CONFIG);
  const [data, setData] = React.useState<ChartData[]>([]);

  React.useEffect(() => {
    if (props.language !== "") {
      api
        .getPagesField({
          language: props.language,
          field: "revisionCount"
        })
        .then(response => {
          setConfig(state => ({
            ...state,
            xMax: response.meta.maxRevisionCount
          }));
          setData(response.data as any);
        });
    }
  }, [props.language, setConfig, setData]);

  return <Histogram data={data} config={config} />;
};
