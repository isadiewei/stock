import { Button } from '@mui/material'
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import FireBaseApp from '../../firebase';
import { StyledInput } from '../../components/Styled/StyledInput.component';
import './AddFish.css';
import { Fish } from '../../models/Fish';

export const AddFish = () => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');

  const db = getFirestore(FireBaseApp);
  const navigate = useNavigate();

  const setData = async () => {
    const docRef = collection(db, 'fish');

    await addDoc(docRef, {
      name,
      type
    } as Fish);
  };

  const onSubmitHandler = (e: BaseSyntheticEvent) => {
    e.stopPropagation();

    setData().then(() => {
      setName('');
      setType('');
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
        <p>Name</p>
        <StyledInput value={name} onChange={e => setName(e.target.value)}></StyledInput>
      </div>
      <div>
        <p>Type</p>
        <StyledInput value={type} onChange={e => setType(e.target.value)}></StyledInput>
      </div>
      <div className="submit-container">
        <Button onClick={e => onSubmitHandler(e)}>Submit</Button>
      </div>
    </>
  )
}
