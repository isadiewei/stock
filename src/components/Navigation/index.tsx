import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { isAdmin } from "../../services/isAdmin";
import { Button } from "@mui/material";

export const Navigation = ({ pageName }: { pageName: string }) => {
  const [signedIn, setSignedIn] = useState(true);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

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

  const onAddCatchClick = (e: MouseEvent) => {
    e.stopPropagation();
    navigate('/addcatch');
  }

  function onAddFishClick(e: MouseEvent): void {
    e.stopPropagation();
    navigate('/addfish');
  }

  return (
    <>
      <div>
        <div>
          {pageName}
        </div>
        <div>
          <Button onClick={() => clickHandler()}>
            {signedIn ? "Sign out" : "Sign in"}
          </Button>
          {admin ?
            <div>
              <Button onClick={(e) => onAddCatchClick(e)}>Add Catch</Button>
              <Button onClick={(e) => onAddFishClick(e)}>Add Fish</Button>
            </div>
            : <></>}
        </div>
      </div>
    </>
  );
};