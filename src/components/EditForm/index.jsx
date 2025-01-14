
export const EditForm = async ({ docPath }) => {
  const docRef = doc(db, "inventory", "1");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  return (
    <div>
      <p>Edit Form</p>
    </div>
  )
}