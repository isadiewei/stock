import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Navigation } from "../../components";
import { DataFrame } from "../../components";
import { collection, DocumentData, getDocs, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../firebase";

export const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigate();
  const db = getFirestore(FireBaseApp);
  const [rows, setRows] = useState([]);

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
    let _rows: Array<DocumentData> = [];

    if (ref.empty) {
      return;
    }

    ref.forEach(doc => {
      const data = doc.data();

      if (data) {
        _rows.push(data);
        console.debug(data);
      }
    });

    console.debug(_rows);
  }

  return (
    <>
      <DataFrame rows={rows} />
      <Navigation pageName="Dashboard" />
      <div className="container mx-auto m-5">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-6 shadow-md mb-5 mt-5 transition duration-500 hover:shadow-xl rounded">
            <h2>
              Welcome:{" "}
              <span className="text-lg font-bold">{user?.displayName}</span>
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