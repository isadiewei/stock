import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { DeleteDocsProps } from "./deleteDocs.model";
import FireBaseApp from "../../firebase";

export const deleteDocs = async ({ collectionName, fieldName, searchValue }: DeleteDocsProps): Promise<boolean> => {
  try {
    const db = getFirestore(FireBaseApp);
    const ref = collection(db, collectionName);
    const q = query(ref, where(fieldName, '==', searchValue));
    const snap = await getDocs(q);
    const documents = snap.docs.map(doc => doc.id);
    // delete those documents
    const results = documents.map(id => {
      try {
        const docRef = doc(db, collectionName, id);
        deleteDoc(docRef);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    });

    return !results.find(value => value === false);
  } catch (error) {
    console.error(error);
    return false;
  }
}