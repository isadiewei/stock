import { doc, getDoc, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../firebase";
import { getImages } from "../../services/filesAccess";
import { InfoDialogProfile } from "./InfoDialog.model";

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