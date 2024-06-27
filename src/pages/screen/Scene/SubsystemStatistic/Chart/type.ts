export type ChartRes = {
  value: number;
  ts: string;
  field?: string;
}[];

export type ChartData = {
  data: { label?: string; value?: string }[];
  name: string;
}[];

export type ChartMapType = Record<
  string,
  {
    name: string;
    unit: string;
  }
>;
