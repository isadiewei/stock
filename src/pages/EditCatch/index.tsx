import { Button, TextField } from "@mui/material"
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import FireBaseApp from "../../firebase";
import { Catch } from "../../models/Catch";

export const EditCatch = () => {
  const params = useParams();
  const [data, setData] = useState<Catch>({} as Catch);
  const [location, setLocation] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  useEffect(() => {
    const db = getFirestore(FireBaseApp);
    const fetchData = async () => {

      const docRef = doc(db, 'catches', params.id?.toString() || '');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const snapData = docSnap.data();
        setData(snapData as Catch);
        setLocation(snapData.location);
        setWeight(snapData.weight);
      } else {
        console.debug('No such document!');
      }
    };

    fetchData();
  }, []);

  const locationSetter = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    setLocation(e.target.value);
  }

  const weightSetter = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    setWeight(e.target.value);
  }

  const onClickHandler = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    console.debug(location, weight);
  }

  return (
    <>
      <h1>catch id: {params.id}</h1>
      <p>{data.location}</p>
      <TextField value={location} onChange={e => locationSetter(e)}></TextField>
      <TextField value={weight} onChange={e => weightSetter(e)}></TextField>
      <Button onClick={e => onClickHandler(e)}>Submit</Button>
    </>
  )
}
