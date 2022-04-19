import { useEffect, useState } from "react";
import HomeView from "../components/view/HomeView";
import factory from "../lib/factory";

export default function Home() {
  /* const [cefList, setCefList] = useState([]);

  useEffect(() => {
    const getCEFs = async () => {
      const cefs = await factory.methods.getDeployedCEF().call();
      setCefList(cefs);
      console.log(cefs);
    };

    getCEFs();
  }, []); */

  return <HomeView />;
}
