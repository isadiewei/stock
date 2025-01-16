export interface SimpleDialogProps {
  open: boolean;
  selectedValue: number;
  onClose: (value: number) => void;
}

export interface Fish {
  name: string;
  type: string;
}
