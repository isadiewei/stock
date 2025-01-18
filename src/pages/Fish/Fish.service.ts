import { collection, getDocs, getFirestore } from "firebase/firestore"
import FireBaseApp from "../../firebase"
import { Fish } from "../../models/Fish";

export const getFishIds = async (): Promise<Array<Fish>> => {
  try {
    const db = getFirestore(FireBaseApp)
    const colRef = await getDocs(collection(db, 'fish'));

    if (colRef.empty) {
      return [];
    }

    const data = colRef.docs.map((doc) => {
      const result = doc.data() as Fish;

      return {
        ...result,
        id: doc.id,
      }
    });

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
