import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import FireBaseApp from "../../../firebase";
import { Fish } from "../../../models/Fish";
import { deleteDocs } from "../../../services/deleteDocs/deleteDocs.service";
import { getImages, handleFileUpload } from "../../../services/filesAccess";

export const addFish = async (fish: Fish, fileList?: Array<File>): Promise<string> => {
  const db = getFirestore(FireBaseApp);
  const ref = collection(db, 'fish');

  const result = await addDoc(ref, fish);

  if (fileList?.length !== undefined && fileList?.length > 0) {
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
        type: data.type,
        characteristics: data.characteristics
      } as Fish
    }
  }

  return null;
}


export const setFish = async (fish: Fish, files?: Array<File>): Promise<boolean> => {
  if (!fish.id) return false;

  const db = getFirestore(FireBaseApp);
  const ref = doc(db, "fish", fish.id);


  if (files && files.length > 0) {
    await deleteDocs({
      collectionName: 'images',
      fieldName: 'trackingId',
      searchValue: fish.id
    });

    handleFileUpload(fish.id, files)
      .catch(error => {
        console.error(error);
      });
  }

  await setDoc(ref, fish);

  return true;
}

export const getProfileImages = async (fishId: string): Promise<Array<Blob>> => {
  const images = await getImages(fishId);

  return images;
}
