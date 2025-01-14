
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Navigation } from "../../components";
import TextField from "@mui/material/TextField";

export const Add = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigation("/");
    }
  }, [user, navigation]);

  const [weight, setWeight] = useState(0);

  return (
    <>
      <Navigation pageName="Add" />
      <div>
        <TextField value={weight} />
      </div>
    </>
  );
};

export default Add;