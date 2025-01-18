import { deleteDoc, doc, getFirestore } from "firebase/firestore"
import FireBaseApp from "../../../../firebase"


export const deleteCatch = async (fishId: string) => {
  if (fishId.length > 0) {
    const db = getFirestore(FireBaseApp);
    console.debug('deleteing', fishId);
    const result = await deleteDoc(doc(db, "fish", fishId));
    return result;
  }
}