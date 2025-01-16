import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import FireBaseApp from "../../../firebase";
import { Catch } from "../../../models/Catch";

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