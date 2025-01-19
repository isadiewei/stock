export interface UploadButtonProps {
  buttonLabel: string;
  handleUpload: (list: FileList | null) => void;
}