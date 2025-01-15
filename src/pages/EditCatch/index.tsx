import { Button } from "@mui/material"
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import FireBaseApp from "../../firebase";
import { Catch } from "../../models/Catch";

export const EditCatch = () => {
  // const db = getFirestore(FireBaseApp);
  const params = useParams();
  const [data, setData] = useState<Catch>({} as Catch);
  // console.debug(catchId);
  useEffect(() => {
    const db = getFirestore(FireBaseApp);
    const fetchData = async () => {

      const docRef = doc(db, "catches", params.id?.toString() || "");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data() as Catch);
      } else {
        console.debug("No such document!");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>catch id: {params.id}</h1>
      <p>{data.location}</p>
      <Button >Submit</Button>
    </>
  )
}



// return (
//   <div>
//     {data.map((item) => (
//       <div key={item.id}>
//         {/* Display your data here */}
//         {item.name}
//       </div>
//     ))}
//   </div>
// );