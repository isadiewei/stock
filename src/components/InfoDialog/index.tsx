import { Dialog, DialogTitle } from "@mui/material";
import FireBaseApp from "../../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SimpleDialogProps } from "./InfoDialog.model";
import { Fish } from '../../models/Fish';

export const InfoDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;
  const [fish, setFish] = useState({} as Fish);
  const [isViewable, setIsViewable] = useState(false);

  const handleClose = () => {
    setIsViewable(false);
    onClose(selectedValue);
  };

  useEffect(() => {
    getData(selectedValue).then(result => {
      setFish(result as Fish);
      setIsViewable(true);
    })
  }, [selectedValue])

  const getData = async (selectedValue: number) => {
    setIsViewable(false);
    const db = getFirestore(FireBaseApp);
    const docRef = doc(db, 'fish', selectedValue.toString() || '');
    const data = (await getDoc(docRef)).data();
    return data;
  }

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