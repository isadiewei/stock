// import { getFirestore } from "firebase/firestore";
// import FireBaseApp from "../../firebase";
// import { collection, doc, setDoc, getDoc } from "firebase/firestore";
// import { EditFrame } from "../../model/EditFrame";
// import { BaseSyntheticEvent, useState } from "react";
// import { TextField } from "@mui/material";

// const db = getFirestore(FireBaseApp)

// // const citiesRef = collection(db, "cities");

// // await setDoc(doc(citiesRef, "SF"), {
// //   name: "San Francisco", state: "CA", country: "USA",
// //   capital: false, population: 860000,
// //   regions: ["west_coast", "norcal"]
// // });
// // await setDoc(doc(citiesRef, "LA"), {
// //   name: "Los Angeles", state: "CA", country: "USA",
// //   capital: false, population: 3900000,
// //   regions: ["west_coast", "socal"]
// // });
// // await setDoc(doc(citiesRef, "DC"), {
// //   name: "Washington, D.C.", state: null, country: "USA",
// //   capital: true, population: 680000,
// //   regions: ["east_coast"]
// // });
// // await setDoc(doc(citiesRef, "TOK"), {
// //   name: "Tokyo", state: null, country: "Japan",
// //   capital: true, population: 9000000,
// //   regions: ["kanto", "honshu"]
// // });
// // await setDoc(doc(citiesRef, "BJ"), {
// //   name: "Beijing", state: null, country: "China",
// //   capital: true, population: 21500000,
// //   regions: ["jingjinji", "hebei"]
// // });

// // const db = getFirestore(FireBaseApp)
// // const docRef = doc(db, "inventory", "1");
// // const docSnap = await getDoc(docRef);

// // if (docSnap.exists()) {
// //   console.log("Document data:", docSnap.data());
// // } else {
// //   // docSnap.data() will be undefined in this case
// //   console.log("No such document!");
// // }
// export const Frame = ({ fsRef, values, fields }: EditFrame) => {
//   const db = getFirestore(FireBaseApp);
//   let [state, setState] = useState({});

//   const docRef = doc(db, fsRef);
  
//   const changePopulation = async () => {
//     console.debug(values);

//     await setDoc(docRef, values).then(() => {
//       console.debug('changed population');
//     });
//   }

//   const handleValueChange = async (e: BaseSyntheticEvent, name: string) => {
//     console.debug('setting', name, 'to', e.target.value);
//     setState({...state, name: e.target.value}); 
//     // state = {...(state as any)[name] = e.target.value};
//     // console.debug('state', state);
//     // setState(state);
//   }

//   return (
//     <div>
//       <div>hello from frame</div>
//       {fields.map(f => {
//         return (
//           <div key={f.name}>
//             <TextField 
//               value={(state as any)[f.name]} 
//               label={f.name}
//               onChange={e => handleValueChange(e, f.name)}
//               ></TextField>
//           </div>
//         );
//       })}
//       <button onClick={() => changePopulation()}>Change Population</button>
//     </div>
//   )
// }