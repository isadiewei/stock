import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../../../firebase";
import { deleteDocs } from "../../../../services/deleteDocs/deleteDocs.service";

export const deleteFish = async (fishId: string) => {
  if (fishId?.length > 0) {
    const db = getFirestore(FireBaseApp);
    await deleteDoc(doc(db, "fish", fishId));

    await deleteDocs({
      collectionName: 'images',
      fieldName: 'trackingId',
      searchValue: fishId
    });

    await deleteDocs({
      collectionName: 'catches',
      fieldName: 'trackingId',
      searchValue: fishId
    });
  }
}
