import { Button } from '@mui/material'
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { StyledInput } from '../../../components/Styled';
import './AddFish.css';
import UploadButton from '../../../components/UploadButton/UploadButton.component';
import { addFish, getFish, setFish } from './AddFish.service';
import { AddFishProps } from './AddFish.model';
import { Fish } from '../../../models/Fish';

export const AddFish = ({ createNew }: AddFishProps) => {
  const params = useParams();
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [files, setFiles] = useState<Array<File>>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!createNew) {
      getFish(params.id?.toString() || '').then(data => {
        if (data) {
          setName(data?.name);
          setType(data?.type);
        }
      });
    }
  }, []);

  const onSubmitHandler = (e: BaseSyntheticEvent) => {
    e.stopPropagation();

    if (createNew) {
      addFish({ name, type }, files).then((_id) => {
        setName('');
        setType('');
      });
    } else {
      setFish({ name, type, id: params.id } as Fish).then(result => {
        console.debug('edit fish', result);
      }).catch(error => {
        console.error(error);
      })
    }
  }

  return (
    <>
      <div className='header-container'>
        <Button onClick={_ => navigate('/fishes')}>Return</Button>
      </div>
      <div>
        <p>Name</p>
        <StyledInput value={name} onChange={e => setName(e.target.value)}></StyledInput>
      </div>
      <div>
        <p>Type</p>
        <StyledInput value={type} onChange={e => setType(e.target.value)}></StyledInput>
      </div>
      {createNew ?
        <div>
          <p>Profile</p>
          <p>png images less than 1mb please</p>
          <UploadButton handleUpload={files => setFiles(Array.from(files || []))}></UploadButton>
        </div>
        : <></>}
      <div className="submit-container">
        <Button onClick={e => onSubmitHandler(e)}>Submit</Button>
      </div>
    </>
  )
}
