import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Navigation } from "../../../components";
import { DataFrame } from "../../../components";
import { Catch } from "../../../models/Catch";
import { populate } from "./Dashboard.service";

export const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigate();
  const [rows, setRows] = useState<Catch[]>([]);
  const [render, setRender] = useState();

  useEffect(() => {
    if (user == null) {
      navigation("/");
    }
  }, [user, navigation]);

  useEffect(() => {
    populate()
    .then(result => {
      setRows(result);
    })
    .catch(error => {
      console.debug(error);
    });
  }, [render]);

  return (
    <>
      <Navigation pageName="Dashboard" />
      <div className="dataframe-container">
        <DataFrame rows={rows} rerender={rerender => rerender ? setRender(render) : false}/>
      </div>
    </>
  );
};

export default Dashboard;