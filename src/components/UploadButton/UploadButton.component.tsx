import { Button } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { UploadButtonProps } from './UploadButton.model';

export const UploadButton = (props: UploadButtonProps) => {
  return (
    <>
      <Button
        variant="outlined"
        component="label"
        startIcon={<FileUpload />}
        sx={{ width: '100%' }}
      >
        {props.buttonLabel}
        <input
          type="file"
          hidden
          onChange={(event) => props.handleUpload(event.target.files)}
        />
      </Button>
    </>
  );
}