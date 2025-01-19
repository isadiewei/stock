import { useEffect, useState } from "react";
import { Navigation } from "../../../components";
import { Fish } from "../../../models/Fish";
import { populate } from "./Dashboard.service";
import { DataFrame } from "./DataFrame/DataFrame.component";

export const FishDashboard = () => {
  const [rows, setRows] = useState<Fish[]>([]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    populate()
      .then(result => {
        setRows(result);
      })
      .catch(error => {
        console.error(error);
      });
  }, [render]);

  return (
    <>
      <Navigation pageName="Fishes"></Navigation>
      <DataFrame rows={rows} rerender={_ => setRender(!render)}></DataFrame>
    </>
  )
} 
