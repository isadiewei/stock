import { doc, getDoc, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../firebase";

export const getData = async (selectedValue: number) => {
  const db = getFirestore(FireBaseApp);
  const docRef = doc(db, 'fish', selectedValue.toString() || '');
  const data = (await getDoc(docRef)).data();
  return data;
}