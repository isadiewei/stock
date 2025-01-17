import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { isAdmin } from "../../services/isAdmin";
import { Button } from "@mui/material";
import './Navigation.css';

export const Navigation = ({ pageName }: { pageName: string }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, [])

  const checkAdmin = async () => {
    const admin = await isAdmin();
    setAdmin(admin);
  }

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
          {admin ?
            <div>
              <Button onClick={_ => navigate('/addcatch')}>Add Catch</Button>
              <Button onClick={_ => navigate('/addfish')}>Add Fish</Button>
            </div>
            : <></>}
          <div>
            <Button onClick={() => clickHandler()}>
              {signedIn ? 'Sign out' : 'Sign in'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};