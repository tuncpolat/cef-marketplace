import { useEffect, useState } from "react";
import HomeView from "../components/view/HomeView";
import factory from "../lib/factory";
import web3 from "../lib/web3";

export default function Home() {
  const [cefList, setCefList] = useState([]);

  useEffect(() => {
    const getCEFs = async () => {};

    getCEFs();
  }, []);

  return (
    <>
      <HomeView />
    </>
  );
}
