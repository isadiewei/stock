import { doc, getDoc, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../firebase";
import { InfoDialogProfile } from "./InfoDialog.model";
import { getImages } from "../../services/filesAccess";

export const getData = async (selectedValue: string): Promise<InfoDialogProfile> => {
  const db = getFirestore(FireBaseApp);
  const docRef = doc(db, 'fish', selectedValue.toString() || '');
  const data = (await getDoc(docRef)).data();
  const result = await getImages(selectedValue);

  return {
    ...data,
    images: result
  } as InfoDialogProfile;
}