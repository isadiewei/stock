import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../../../firebase";
import { deleteDocs } from "../../../../services/deleteDocs/deleteDocs.service";

export const deleteFish = async (fishId: string) => {
  if (fishId?.length > 0) {
    console.debug(fishId);
    const db = getFirestore(FireBaseApp);
    await deleteDoc(doc(db, "fish", fishId));

    deleteDocs({
      collectionName: 'images',
      fieldName: 'trackingId',
      searchValue: fishId
    });

    deleteDocs({
      collectionName: 'catches',
      fieldName: 'trackingId',
      searchValue: fishId
    });
  }
}
