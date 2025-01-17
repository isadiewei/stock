import { Button } from '@mui/material'
import { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { StyledInput } from '../../../components/Styled';
import './AddFish.css';
import UploadButton from '../../../components/UploadButton/UploadButton.component';
import { addFish } from './AddFish.service';

export const AddFish = () => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [files, setFiles] = useState<Array<File>>();
  const navigate = useNavigate();

  const onSubmitHandler = (e: BaseSyntheticEvent) => {
    e.stopPropagation();

    addFish({ name, type }, files).then((_id) => {
      setName('');
      setType('');
    });
  }

  return (
    <>
      <div className='header-container'>
        <Button onClick={_ => navigate('/dashboard')}>Return</Button>
      </div>
      <div>
        <p>Name</p>
        <StyledInput value={name} onChange={e => setName(e.target.value)}></StyledInput>
      </div>
      <div>
        <p>Type</p>
        <StyledInput value={type} onChange={e => setType(e.target.value)}></StyledInput>
      </div>
      <div>
        <p>Profile</p>
        <p>png images less than 1mb please</p>
        <UploadButton handleUpload={files => setFiles(Array.from(files || []))}></UploadButton>
      </div>
      <div className="submit-container">
        <Button onClick={e => onSubmitHandler(e)}>Submit</Button>
      </div>
    </>
  )
}
