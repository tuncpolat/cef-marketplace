import { useEffect, useState } from "react";
import HomeView from "../components/view/HomeView";
import factory from "../lib/factory";
import Cef from "../lib/cef";

export default function Home() {
  const [cefList, setCefList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCEFs = async () => {
      setLoading(true);
      const funds = await factory.methods.getDeployedCEF().call();
      let fetchedFunds = [];
      for (let i = 0; i < funds.length; i++) {
        const fund = Cef(funds[i]); // address
        let data = await fund.methods.getSummary().call();
        data["address"] = funds[i];
        fetchedFunds.push(data);
      }
      setCefList(fetchedFunds);
      setLoading(false);
    };
    getCEFs();
  }, []);

  return (
    <>
      <HomeView funds={cefList} loading={loading} />
    </>
  );
}
