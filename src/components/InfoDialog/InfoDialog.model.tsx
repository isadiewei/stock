export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export interface InfoDialogProfile {
  name: string;
  type: string;
  images: Array<File>;
}
