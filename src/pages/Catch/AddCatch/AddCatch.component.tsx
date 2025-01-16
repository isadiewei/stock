import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import FireBaseApp from '../../../firebase';
import { Catch } from '../../../models/Catch';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { StyledInput } from '../../../components/Styled';
import { getFishIds } from '../../Fish/Fish.service';
import './AddCatch.css';

export const AddCatch = () => {
  const [location, setLocation] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [lure, setLure] = useState<string>('');
  const [trackingId, setTrackingId] = useState<string>('');
  const [datetime, setDatetime] = useState<Date>(new Date());
  const [trackingIdList, setTrackingIdList] = useState<string[]>([]);
  const db = getFirestore(FireBaseApp);
  const navigate = useNavigate();

  useEffect(() => {
    getFishIds().then(ids => {
      setTrackingIdList(ids);
    })
  }, trackingIdList)

  const onSubmitHandler = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    console.debug(location, weight);

    const setData = async () => {
      const docRef = collection(db, 'catches');

      await addDoc(docRef, {
        location: location,
        weight: Number(weight),
        trackingId: trackingId,
        lure: lure,
        date: datetime
      } as Catch);

      setLocation('');
      setWeight('');
      setTrackingId('');
      setLure('');
      setDatetime(new Date());
    };

    setData().then(() => {
      console.debug('data added');
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
        <FormControl fullWidth>
          <InputLabel>Age</InputLabel>
          <Select
            value={trackingId}
            label="Example"
            onChange={e => setTrackingId(e.target.value as string)}
          >
            {trackingIdList.map(id => <MenuItem key={id} value={id}>{id}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div>
        <p>Catch Date</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker value={dayjs(datetime)} onChange={(value: any) => setDatetime(value?.toDate())}></DateTimePicker>
        </LocalizationProvider>
      </div>
      <div className="submit-container">
        <Button onClick={e => onSubmitHandler(e)}>Submit</Button>
      </div>
    </>
  )
}
