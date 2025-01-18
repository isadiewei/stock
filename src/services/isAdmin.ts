
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import FireBaseApp from "../firebase";

export const isAdmin = async (): Promise<boolean> => {
  const db = getFirestore(FireBaseApp);
  const auth = getAuth();
  const user = auth.currentUser;

  if (user?.email) {
    const docRef = doc(db, 'admins', user?.email?.toString() || '');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const snapData = docSnap.data();
      return snapData.isAdmin;
    }
  }

  return false;
}
