import { useEffect, useState } from "react";
import { Navigation } from "../../../components";
import { Fish } from "../../../models/Fish";
import { populate } from "./Dashboard.service";
import { DataFrame } from "./DataFrame/DataFrame.component";

export const FishDashboard = () => {
  const [rows, setRows] = useState<Fish[]>([]);
  const [render, setRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
      <Navigation pageName="Fishes" isLoading={isLoading}></Navigation>
      <DataFrame rows={rows} rerender={_ => setRender(!render)}></DataFrame>
    </>
  )
} 
