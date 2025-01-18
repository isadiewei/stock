import { Fish } from "../../../../models/Fish";

export interface DataFrameProps {
  rows: Array<Fish>;
  rerender: (reload: boolean) => void;
}