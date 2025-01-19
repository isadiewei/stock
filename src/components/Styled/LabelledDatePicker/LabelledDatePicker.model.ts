import { Dayjs } from "dayjs";

export interface LabelledDatePickerProps {
  label: string;
  value: Dayjs;
  onChange: (value: Dayjs | null) => void
}