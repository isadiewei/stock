import { doc, getDoc, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../../firebase";

export const getCatch = async (id: string) => {
  const db = getFirestore(FireBaseApp);
  const docRef = doc(db, 'catches', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
    const snapData = docSnap.data();
    return snapData;
  } else {
    console.debug('No such document!');
  }
};