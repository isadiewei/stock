import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../../../components";
import { Catch } from "../../../models/Catch";
import { populate } from "./Dashboard.service";
import { DataFrame } from "./DataFrame";

export const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigate();
  const [rows, setRows] = useState<Catch[]>([]);
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user == null) {
      navigation("/");
    }
  }, [user, navigation]);

  useEffect(() => {
    setIsLoading(true);

    populate()
    .then(result => {
      setRows(result);
      setIsLoading(false);
    })
    .catch(error => {
      console.error(error);
      setIsLoading(false);
    });
  }, [render]);

  return (
    <>
      <Navigation pageName="Catches" isLoading={isLoading} />
      <div className="dataframe-container">
        <DataFrame rows={rows} rerender={_ => setRender(!render)}/>
      </div>
    </>
  );
};

export default Dashboard;