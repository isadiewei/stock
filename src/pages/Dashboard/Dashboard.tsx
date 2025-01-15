import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Navigation } from "../../components";
import { DataFrame } from "../../components";
import { collection, DocumentData, getDocs, getFirestore } from "firebase/firestore";
import FireBaseApp from "../../firebase";
import { Catch } from "./Dashboard.model";

export const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigate();
  const db = getFirestore(FireBaseApp);
  const [rows, setRows] = useState<Catch[]>([]);

  useEffect(() => {
    if (user == null) {
      navigation("/");
    }
  }, [user, navigation]);

  useEffect(() => {
    populate();
  }, []);
  // useEffect(() => {
  //   const db = getDatabase();
  //   const dataRef = ref(db, 'path/to/your/data'); 

  //   const unsubscribe = onValue(dataRef, (snapshot) => {
  //     const fetchedData = snapshot.val();
  //     setData(fetchedData);
  //   });

  //   // Cleanup on unmount
  //   return () => unsubscribe();
  // }, []);
  const populate = async () => {
    const ref = await getDocs(collection(db, "catches"));
    let _rows: Array<DocumentData> = [];

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
      <div className="dataframe-container">
        <DataFrame rows={rows} />
      </div>
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