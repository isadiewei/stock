import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../firebase";

export const isAdmin = async () => {
  const db = getFirestore(FireBaseApp);
  const auth = getAuth();
  const user = auth.currentUser;
  console.debug('isAdmin', user?.email);
  const docRef = doc(db, 'admins', user?.email?.toString() || '');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const snapData = docSnap.data();
    console.debug('snapData', snapData);
  } else {
    console.debug('no data found for user', user?.email);
  }

  return false;
}