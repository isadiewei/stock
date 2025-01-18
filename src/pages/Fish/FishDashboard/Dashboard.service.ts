import { collection, getDocs, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../../firebase";
import { Fish } from "../../../models/Fish";

export const populate = async (): Promise<Array<Fish>> => {
  const db = getFirestore(FireBaseApp);
  const ref = await getDocs(collection(db, "fish"));

  if (ref.empty) {
    return [];
  }

  const data: Fish[] = ref.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as Fish));

  return data;
}