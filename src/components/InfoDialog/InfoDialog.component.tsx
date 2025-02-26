import { Dialog, DialogTitle, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Fish } from '../../models/Fish';
import './InfoDialog.css';
import { SimpleDialogProps } from "./InfoDialog.model";
import { getData } from "./InfoDialog.service";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo.component";

export const InfoDialog = ({ onClose, selectedValue, open }: SimpleDialogProps) => {
  const [fish, setFish] = useState({} as Fish);
  const [isViewable, setIsViewable] = useState(false);
  const [files, setFiles] = useState<Array<File>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    setIsViewable(false);
    setIsLoading(true);

    if (selectedValue?.length > 0) {
      getData(selectedValue).then(result => {
        setFish(result as Fish);
        setIsViewable(true);
        setFiles(result.images);
        setIsLoading(false);
      });
    }
  }, [selectedValue])

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{selectedValue}</DialogTitle>
      {isLoading && <LinearProgress></LinearProgress>}
      {isViewable ?
        <div>
          <div>
            <ProfileInfo label="Name" content={fish?.name} ></ProfileInfo>
          </div>
          <div>
            <ProfileInfo label="Type" content={fish?.type}></ProfileInfo>
          </div>
          <div>
            <ProfileInfo label="Info" content={fish?.characteristics}></ProfileInfo>
          </div>
          <div className="profile-container">
            {files.map(file =>
              <img key={file.name} src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        : <></>}
    </Dialog>
  );
}