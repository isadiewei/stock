import { Button } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { UploadButtonProps } from './UploadButton.model';

export const UploadButton = (props: UploadButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      component="label"
      startIcon={<FileUpload />}
    >
      Upload
      <input
        type="file"
        hidden
        onChange={(event) => props.handleUpload(event.target.files)}
      />
    </Button>
  );
}