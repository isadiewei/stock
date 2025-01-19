import { Button, ButtonGroup, LinearProgress } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../services/isAdmin";
import './Navigation.css';
import { NavigationProps } from "./Navigation.model";

export const Navigation = ({ pageName, isLoading }: NavigationProps) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [signedIn, setSignedIn] = useState(true);

  useEffect(() => {
    isAdmin().then(admin => setAdmin(admin));
  }, [])

  const clickHandler = () => {
    setSignedIn(!signedIn);
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="navigation-container">
        <div className="pagename-container">
          <h3>
            {pageName}
          </h3>
          <p className="username-container">
            {user?.displayName}
          </p>
        </div>
        <div className="button-container">
          <div>
            <ButtonGroup>
              <Button onClick={_ => navigate('/dashboard')}>Catch</Button>
              <Button onClick={_ => navigate('/fishes')}>Fish</Button>
            </ButtonGroup>
          </div>
          {admin ?
            <div className="add-button-container">
              <ButtonGroup variant="contained">
                <Button onClick={_ => navigate('/addcatch')}>Add Catch</Button>
                <Button onClick={_ => navigate('/addfish')}>Add Fish</Button>
              </ButtonGroup>
            </div>
            : <></>}
          <div>
            <Button onClick={() => clickHandler()}>
              {signedIn ? 'Sign out' : 'Sign in'}
            </Button>
          </div>
        </div>
      </div>
      {isLoading && <LinearProgress></LinearProgress>}
    </>
  );
};