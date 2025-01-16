import { Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { SimpleDialogProps } from "./InfoDialog.model";
import { Fish } from '../../models/Fish';
import { getData } from "./InfoDialog.service";

export const InfoDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;
  const [fish, setFish] = useState({} as Fish);
  const [isViewable, setIsViewable] = useState(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    setIsViewable(false);

    getData(selectedValue).then(result => {
      setFish(result as Fish);
      setIsViewable(true);
    })
  }, [selectedValue])

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Pulling TrackingId {selectedValue}</DialogTitle>
      {isViewable ?
        <div>
          <p>name</p>
          <p>{fish?.name}</p>
          <p>type</p>
          <p>{fish?.type}</p>
        </div>
        : <></>}
    </Dialog>
  );
}