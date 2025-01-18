import { collection, getDocs, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../../firebase";
import { Catch } from "../../../models/Catch";

export const populate = async (): Promise<Array<Catch>> => {
  const db = getFirestore(FireBaseApp);
  const ref = await getDocs(collection(db, "catches"));

  if (ref.empty) {
    return [];
  }

  const data: Catch[] = ref.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as Catch));

  return data;
}