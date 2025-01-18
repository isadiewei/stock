import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Catch } from '../../../models/Catch';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import './EditCatch.css';
import { getFishIds } from '../../Fish/Fish.service';
import { addCatch, getCatch, setCatch } from './EditCatch.service';
import { EditCatchProps } from './EditCatch.model';
import { Fish } from '../../../models/Fish';
import { LabelledInput } from '../../../components/Styled/LabelledInput.component';
import { KeyboardReturn } from '@mui/icons-material';

export const EditCatch = ({ createNew }: EditCatchProps) => {
  const params = useParams();
  const [location, setLocation] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [lure, setLure] = useState<string>('');
  const [trackingId, setTrackingId] = useState<string>('');
  const [trackingIdList, setTrackingIdList] = useState<Fish[]>([]);
  const [datetime, setDatetime] = useState<Date>(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    getFishIds().then(fishes => {
      setTrackingIdList(fishes)
    }).catch(error => {
      console.error(error);
    })
  }, [])


  useEffect(() => {
    if (!createNew) {
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

    if (createNew) {
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
  }

  const onReturnClick = (e: BaseSyntheticEvent) => {
    e.stopPropagation();
    navigate('/dashboard');
  }

  return (
    <>
      <div className='header-container'>
        <Button onClick={(e) => onReturnClick(e)}><KeyboardReturn /></Button>
        {!createNew ? <h3>editing: {params.id}</h3> : <></>}
      </div>
      <div>
        <LabelledInput
          label='Location'
          value={location}
          onChange={e => setLocation(e.target.value)}
        ></LabelledInput>
      </div>
      <div>
        <LabelledInput
          label='Weight'
          value={weight}
          onChange={e => setWeight(e.target.value)}
        ></LabelledInput>
      </div>
      <div>
        <LabelledInput
          label='Lure'
          value={lure}
          onChange={e => setLure(e.target.value)}
        ></LabelledInput>
      </div>
      <div className="selector">
        <FormControl fullWidth>
          <InputLabel>Tracking Id</InputLabel>
          <Select
            value={trackingId}
            label="Example"
            onChange={e => setTrackingId(e.target.value as string)}
          >
            {trackingIdList.map(fish => <MenuItem key={fish.id} value={fish.id}>{`${fish.name} ${fish.id}`}</MenuItem>)}
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
