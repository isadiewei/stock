export interface SimpleDialogProps {
  open: boolean;
  selectedValue: number;
  onClose: (value: number) => void;
}
