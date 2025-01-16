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
      <span className="text-lg font-bold">{user?.displayName}</span>
      <div className="dataframe-container">
        <DataFrame rows={rows} />
      </div>
      <div className="container mx-auto m-5">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-6 shadow-md mb-5 mt-5 transition duration-500 hover:shadow-xl rounded">
            <h2>
              Welcome:{" "}
            </h2>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <h3>You are logged IN!!🔥🔥🔥🔥🔥</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;