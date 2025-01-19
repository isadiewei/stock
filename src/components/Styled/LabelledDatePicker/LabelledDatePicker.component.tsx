import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import './LabelledDatePicker.css';
import { LabelledDatePickerProps } from "./LabelledDatePicker.model";

export const LabelledDatePicker = ({ label, value, onChange }: LabelledDatePickerProps) => {
  return (
    <div>
      <p>{label}</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker value={dayjs(value)} onChange={(value: Dayjs | null) => onChange(value)}></DateTimePicker>
      </LocalizationProvider>
    </div>
  );
}