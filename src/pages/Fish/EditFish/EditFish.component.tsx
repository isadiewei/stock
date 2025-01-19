import { KeyboardReturn } from '@mui/icons-material';
import { Button } from '@mui/material';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadButton } from '../../../components';
import { LabelledInput } from '../../../components/Styled';
import { Fish } from '../../../models/Fish';
import './EditFish.css';
import { EditFishProps } from './EditFish.model';
import { addFish, getFish, setFish } from './EditFish.service';

export const EditFish = ({ createNew }: EditFishProps) => {
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
        <Button onClick={_ => navigate('/fishes')}><KeyboardReturn /></Button>
      </div>
      <div>
        <LabelledInput value={name} label='Name' onChange={e => setName(e.target.value)}></LabelledInput>
      </div>
      <div>
        <LabelledInput value={type} label='Type' onChange={e => setType(e.target.value)}></LabelledInput>
      </div>
      {createNew ?
        <div>
          <UploadButton buttonLabel='Upload Fish Image' handleUpload={files => setFiles(Array.from(files || []))}></UploadButton>
        </div>
        : <></>}
      <div className="submit-container">
        <Button onClick={e => onSubmitHandler(e)}>Submit</Button>
      </div>
    </>
  )
}
