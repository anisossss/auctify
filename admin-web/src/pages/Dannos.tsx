import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalDannos } from "../reducers/totalDannosSlice";
import Card from "../components/card";
type Props = {};

const Dannos: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { total, totalReceived, totalSent, isLoading, error } = useSelector(
    (state: any) => state.totalDannos
  );

  useEffect(() => {
    dispatch(fetchTotalDannos());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      <Card
        title="Total Auctifys"
        value={total}
        label1="REVENUS"
        label2="DEPENSES"
        value1={totalReceived}
        value2={totalSent}
      />
    </div>
  );
};

export default Dannos;
