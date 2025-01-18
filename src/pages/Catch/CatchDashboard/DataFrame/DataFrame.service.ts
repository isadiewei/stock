import { deleteDoc, doc, getFirestore } from "firebase/firestore"
import FireBaseApp from "../../../../firebase"

export const deleteCatch = async (catchId: string) => {
  if (catchId.length > 0) {
    const db = getFirestore(FireBaseApp);
    console.debug('deleteing', catchId);
    const result = await deleteDoc(doc(db, "catches", catchId));
    return result;
  }
}