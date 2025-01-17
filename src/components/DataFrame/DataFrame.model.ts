import { Catch } from "../../models/Catch";

export interface DataFrameInput {
  rows: Array<Catch>;
  rerender: (reload: boolean) => void;
}