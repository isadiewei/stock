import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import FireBaseApp from '../../../firebase';
import { Catch } from '../../../models/Catch';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { StyledInput } from '../../../components/Styled';
import './EditCatch.css';
import { getFishIds } from '../../Fish/Fish.service';
import { addCatch, getCatch, setCatch } from './EditCatch.service';
import { EditCatchProps } from './EditCatch.model';

export const EditCatch = (props: EditCatchProps) => {
  const params = useParams();
  const [location, setLocation] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [lure, setLure] = useState<string>('');
  const [trackingId, setTrackingId] = useState<string>('');
  const [trackingIdList, setTrackingIdList] = useState<string[]>([]);
  const [datetime, setDatetime] = useState<Date>(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    getFishIds().then(ids => {
      setTrackingIdList(ids);
    })
  }, [])


  useEffect(() => {
    if (!props.createNew) {
      getCatch(params.id?.toString() || '').then(data => {
        setLocation(data?.location);
        setWeight(data?.weight);
        setLure(data?.lure);
        setTrackingId(data?.trackingId);
      });
    }
  }, []);

  const dateSetter = (e: Dayjs) => {
    console.debug(e);
    setDatetime(e.toDate());
  }

  const onSubmitHandler = (e: BaseSyntheticEvent) => {
    e.stopPropagation();

    if (props.createNew) {
      addCatch({
        location: location,
        weight: Number(weight),
        trackingId: trackingId,
        lure: lure,
        date: datetime
      } as Catch).then(() => {
        console.debug('catch added');
      });
    } else {
      setCatch(params.id?.toString() || '', {
        id: params.id,
        location: location,
        weight: Number(weight),
        trackingId: trackingId,
        lure: lure,
        date: datetime
      } as Catch)
        .then(() => {
          console.debug('data updated');
        })
    }
    // const setData = async () => {
    //   const docRef = doc(db, 'catches', params.id?.toString() || '');
    //   await setDoc(docRef, {
    //     id: params.id,
    //     location: location,
    //     weight: Number(weight),
    //     trackingId: trackingId,
    //     lure: lure,
    //     date: datetime
    //   } as Catch);
    // };

    // setData().then(() => {
    //   console.debug('data updated');
    // });
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
          <DateTimePicker value={dayjs(datetime)} onChange={(value: any) => dateSetter(value)}></DateTimePicker>
        </LocalizationProvider>
      </div>
      <div className="submit-container">
        <Button onClick={e => onSubmitHandler(e)}>Submit</Button>
      </div>
    </>
  )
}
