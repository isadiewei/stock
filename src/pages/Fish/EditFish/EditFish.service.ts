import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { Fish } from "../../../models/Fish";
import FireBaseApp from "../../../firebase";
import { getImages, handleFileUpload } from "../../../services/filesAccess";

export const addFish = async (fish: Fish, fileList?: Array<File>): Promise<string> => {
  const db = getFirestore(FireBaseApp);
  const ref = collection(db, 'fish');

  const result = await addDoc(ref, fish);

  if (fileList) {
    handleFileUpload(result.id, fileList);
  }

  return result.id;
};

export const getFish = async (id: string): Promise<Fish | null> => {
  if (id) {
    const db = getFirestore(FireBaseApp);
    const ref = doc(db, "fish", id);

    const result = await getDoc(ref);
    const data = result?.data();

    if (data) {
      return {
        id: result.id,
        name: data.name,
        type: data.type
      } as Fish
    }
  }

  return null;
}


export const setFish = async (fish: Fish): Promise<boolean> => {
  if (!fish.id) return false;

  const db = getFirestore(FireBaseApp);
  const ref = doc(db, "fish", fish.id);

  await setDoc(ref, fish);

  return true;
}

export const getProfileImages = async (fishId: string): Promise<Array<Blob>> => {
  const images = await getImages(fishId);

  return images;
}
