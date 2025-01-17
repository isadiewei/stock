import { addDoc, collection, getFirestore } from "firebase/firestore";
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

export const getProfileImages = async (fishId: string): Promise<Array<Blob>> => {
  const images = await getImages(fishId);

  return images;
}
