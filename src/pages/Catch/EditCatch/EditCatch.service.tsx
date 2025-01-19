import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import FireBaseApp from "../../../firebase";
import { Catch } from "../../../models/Catch";

export const getCatch = async (id: string) => {
  if (id.length > 0) {
    const db = getFirestore(FireBaseApp);
    const docRef = doc(db, 'catches', id);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const snapData = snap.data();
      return snapData;
    } else {
      console.warn('No document for id', id);
    }
  }
};


export const setCatch = async (id: string, data: Catch) => {
  const db = getFirestore(FireBaseApp);
  const docRef = doc(db, 'catches', id);
  await setDoc(docRef, data);
};

export const addCatch = async (data: Catch) => {
  const db = getFirestore(FireBaseApp);
  const ref = collection(db, 'catches');
  await addDoc(ref, data);
};