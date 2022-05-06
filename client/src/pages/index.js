import { useEffect, useState } from "react";
import HomeView from "../components/view/HomeView";
import Banner from "../components/shared/Banner";
import factory from "../lib/factory";
import Cef from "../lib/cef";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [cefList, setCefList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCEFs = async () => {
      setLoading(true);
      try {
        const funds = await factory.methods.getDeployedCEF().call();
        let fetchedFunds = [];
        for (let i = 0; i < funds.length; i++) {
          const fund = Cef(funds[i]); // address
          let data = await fund.methods.getSummary().call();
          data["address"] = funds[i];
          fetchedFunds.push(data);
        }
        setCefList(fetchedFunds);
      } catch (error) {
        setOpen(true);
        setError(true);
      }

      setLoading(false);
    };
    getCEFs();
  }, []);

  return (
    <>
      {open ? <Banner setOpen={setOpen} /> : null}
      <HomeView error={error} funds={cefList} loading={loading} />
    </>
  );
}
