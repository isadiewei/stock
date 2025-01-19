import { KeyboardReturn } from '@mui/icons-material';
import { Button, CircularProgress, LinearProgress } from '@mui/material';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation, UploadButton } from '../../../components';
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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    e.stopPropagation();

    if (createNew) {
      addFish({ name, type }, files).then((_id) => {
        setName('');
        setType('');
        setLoading(false);
      });
    } else {
      setFish({ name, type, id: params.id } as Fish).then(result => {
        setLoading(false);
      }).catch(error => {
        console.error(error);
        setLoading(false);
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
      {createNew &&
        <div className='upload-container'>
          <UploadButton buttonLabel='Upload Fish Image' handleUpload={files => setFiles(Array.from(files || []))}></UploadButton>
        </div>
      }
      <div className="submit-container">
        {loading && <CircularProgress size={20} />}
        <Button onClick={e => onSubmitHandler(e)}>Submit</Button>
      </div>
    </>
  )
}
