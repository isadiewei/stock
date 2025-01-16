import { collection, getDocs, getFirestore } from "firebase/firestore"
import FireBaseApp from "../../firebase"

export const getFishIds = async () => {
  const db = getFirestore(FireBaseApp)
  const colRef = await getDocs(collection(db, 'fish'));

  if (colRef.empty) {
    return [];
  }

  const data = colRef.docs.map((doc) => doc.id);

  console.debug(data);
  return data;
}
