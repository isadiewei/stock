import { Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { SimpleDialogProps } from "./InfoDialog.model";
import { Fish } from '../../models/Fish';
import { getData } from "./InfoDialog.service";
import './InfoDialog.css';
import { ProfileInfo } from "./ProfileInfo/ProfileInfo.component";

export const InfoDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;
  const [fish, setFish] = useState({} as Fish);
  const [isViewable, setIsViewable] = useState(false);
  const [files, setFiles] = useState<Array<File>>([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    setIsViewable(false);

    getData(selectedValue).then(result => {
      setFish(result as Fish);
      setIsViewable(true);
      setFiles(result.images);
      console.debug(files);
    })
  }, [selectedValue])

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Pulling TrackingId {selectedValue}</DialogTitle>
      {isViewable ?
        <div>
          <div>
            <ProfileInfo label="name" content={fish?.name} ></ProfileInfo>
          </div>
          <div>
            <ProfileInfo label="type" content={fish?.type}></ProfileInfo>
          </div>
          <div className="profile-container">
            {files.map(file =>
              <img src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        : <></>}
    </Dialog>
  );
}