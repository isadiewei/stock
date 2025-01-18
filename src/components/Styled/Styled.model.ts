import { BaseSyntheticEvent } from "react";

export interface LabelledInputProps {
  label: string;
  value: any;
  onChange: (e: BaseSyntheticEvent) => void;
}