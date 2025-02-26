import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import FireBaseApp from "../firebase";
import { fileToString, stringToFile } from "./fileConverter";

export const handleFileUpload = async (trackingId: string, fileList: Array<File>): Promise<void> => {
  const db = getFirestore(FireBaseApp);
  const ref = collection(db, 'images');

  fileList.forEach(file => {
    fileToString(file).then(content => {
      addDoc(ref, {
        name: file.name,
        trackingId,
        content
      }).then(_result => {
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    })
  })
}

export const getImages = async (selectedValue: string): Promise<Blob[]> => {
  const db = getFirestore(FireBaseApp);
  const ref = collection(db, 'images');
  const q = query(ref, where('trackingId', '==', selectedValue));
  const snap = await getDocs(q);

  const results = snap.docs.map(doc => {
    const result = doc.data();
    const file = stringToFile(result.content);
    return file;
  });

  return results;
}
