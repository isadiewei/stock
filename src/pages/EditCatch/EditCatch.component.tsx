import { Button } from '@mui/material'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import FireBaseApp from '../../firebase';
import { Catch } from '../../models/Catch';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { StyledInput } from '../../components/Styled';
import './EditCatch.css';

export const EditCatch = () => {
  const params = useParams();
  const [location, setLocation] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [lure, setLure] = useState<string>('');
  const [trackingId, setTrackingId] = useState<string>('');
  const [datetime, setDatetime] = useState<Date>(new Date());
  const db = getFirestore(FireBaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'catches', params.id?.toString() || '');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const snapData = docSnap.data();
        setLocation(snapData.location);
        setWeight(snapData.weight);
        setLure(snapData.lure);
        setTrackingId(snapData.trackingId);
      } else {
        console.debug('No such document!');
      }
    };

    fetchData();
  }, []);

  const dateSetter = (e: Dayjs) => {
    console.debug(e);
    setDatetime(e.toDate());
  }

  const onSubmitHandler = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    console.debug(location, weight);

    const setData = async () => {
      const docRef = doc(db, 'catches', params.id?.toString() || '');
      await setDoc(docRef, {
        id: params.id,
        location: location,
        weight: Number(weight),
        trackingId: Number(trackingId),
        lure: lure,
        date: datetime
      } as Catch);
    };

    setData().then(() => {
      console.debug('data updated');
    });
  }

  const onReturnClick = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    navigate('/dashboard');
  }

  return (
    <>
      <div className='header-container'>
        <Button onClick={(e) => onReturnClick(e)}>Return</Button>
        <h3>editing: {params.id}</h3>
      </div>
      <div>
        <p>Location</p>
        <StyledInput value={location} onChange={e => setLocation(e.target.value)}></StyledInput>
      </div>
      <div>
        <p>Weight</p>
        <StyledInput value={weight} onChange={e => setWeight(e.target.value)}></StyledInput>
      </div>
      <div>
        <p>Lure</p>
        <StyledInput value={lure} onChange={e => setLure(e.target.value)}></StyledInput>
      </div>
      <div>
        <p>Tracking Id</p>
        <StyledInput value={trackingId} onChange={e => setTrackingId(e.target.value)}></StyledInput>
      </div>
      <div>
        <p>Catch Date</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker value={dayjs(datetime)} onChange={(value: any) => dateSetter(value)}></DateTimePicker>
        </LocalizationProvider>
      </div>
      <div className="submit-container">
        <Button onClick={e => onSubmitHandler(e)}>Submit</Button>
      </div>
    </>
  )
}
