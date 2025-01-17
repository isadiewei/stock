import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Navigation } from "../../components";
import { DataFrame } from "../../components";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../firebase";
import { Catch } from "../../models/Catch";

export const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigate();
  const db = getFirestore(FireBaseApp);
  const [rows, setRows] = useState<Catch[]>([]);
  console.debug('user', user);

  useEffect(() => {
    if (user == null) {
      navigation("/");
    }
  }, [user, navigation]);

  useEffect(() => {
    populate();
  }, []);

  const populate = async () => {
    const ref = await getDocs(collection(db, "catches"));

    if (ref.empty) {
      return;
    }

    const data: Catch[] = ref.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as Catch));

    console.debug(data);
    setRows(data);
  }

  return (
    <>
      <Navigation pageName="Dashboard" />
      <div className="dataframe-container">
        <DataFrame rows={rows} rerender={rerender => rerender ? populate() : false}/>
      </div>
    </>
  );
};

export default Dashboard;