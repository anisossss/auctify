import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalProductsDannosPerMonth } from "../reducers/totalProductsPricePerMonthSlice";
import { fetchTotalDannosParticipation } from "../reducers/totalDannosParticipationPerMonthSlice";
import { fetchTotalAmountByCompany } from "../reducers/totalAmountByCompanySlice";
import { fetchTopParticipant } from "../reducers/topParticipantSlice";
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";
import TotalCompanies from "./TotalCompanies";
import TotalProds from "./TotalProds";
import TotalProdsBenefits from "./TotalProdsBenefits";
import TotalUsers from "./TotalUsers";
import TotalDannos from "./Dannos";
import TotalParticipation from "./TotalParticipation";
import { API_URL } from "../api/axiosConfig";
import LastProducts from "./LastProducts";
type Props = {};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Dashboard = (props: Props) => {
  const dispatch = useDispatch<any>();
  const totDannosPerMonth = useSelector(
    (state: any) => state?.totalProductsDannosPerMonth?.data
  );
  const totalDannosParticipationPerMonth = useSelector(
    (state: any) => state?.totalDannosParticipationPerMonth?.data
  );
  const totalAmountByCompany = useSelector(
    (state: any) => state?.totalAmountByCompany?.data
  );

  const topPlayers = useSelector((state: any) => state?.topParticipant?.data);
  //console.log(topPlayers);

  const chartRef = useRef<any>();
  const participationChartRef = useRef<any>();
  const companyChartRef = useRef<any>();

  useEffect(() => {
    dispatch(fetchTotalProductsDannosPerMonth());
    dispatch(fetchTotalDannosParticipation());
    dispatch(fetchTotalAmountByCompany());
    dispatch(fetchTopParticipant());
  }, []);

  useEffect(() => {
    if (totDannosPerMonth) {
      const monthData = monthNames.map((month) => {
        const foundData = totDannosPerMonth.find(
          (elem: any) => elem.month === month
        );
        return foundData ? foundData.totalPrice : 0;
      });

      const options: ApexOptions = {
        chart: {
          type: "bar",
          height: 350,
        },
        xaxis: {
          categories: monthNames,
        },
        series: [
          {
            name: "Total Price",
            data: monthData,
          },
        ],
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [totDannosPerMonth]);

  useEffect(() => {
    if (totalDannosParticipationPerMonth) {
      const monthData = monthNames.map((month) => {
        const foundData = totalDannosParticipationPerMonth.find(
          (elem: any) => elem.month === month
        );
        return foundData ? foundData.totalAmountGiven : 0;
      });

      const options: ApexOptions = {
        chart: {
          type: "bar",
          height: 350,
        },
        xaxis: {
          categories: monthNames,
        },
        series: [
          {
            name: "Total Amount Given",
            data: monthData,
          },
        ],
      };

      const chart = new ApexCharts(participationChartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [totalDannosParticipationPerMonth]);

  useEffect(() => {
    if (totalAmountByCompany) {
      const companyData = totalAmountByCompany.map((elem: any) => {
        return {
          x: elem.companyName,
          y: elem.totalAmount,
        };
      });

      const options: ApexOptions = {
        chart: {
          type: "pie",
          height: 350,
        },
        series: companyData.map((data: any) => data.y),
        labels: companyData.map((data: any) => data.x),
        tooltip: {
          y: {
            formatter: function (val) {
              return `Total Amount: ${val}dt`;
            },
          },
        },
      };

      const chart = new ApexCharts(companyChartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [totalAmountByCompany]);

  const allMonths = Array.from(Array(12).keys()).map(
    (monthIndex) => monthIndex + 1
  );

  return (
    <div className="dashboardContainer">
      <div className="dashboardLine">
        <div className="dashBoardColum dashStatCol">
          <TotalUsers />
          <TotalDannos />
          <TotalParticipation />
        </div>
        <div className="dashBoardColum dashStatCol">
          <TotalCompanies />
          <TotalProds />
          <TotalProdsBenefits />
        </div>
        <div className="dashBoardColum dashGraphCol">
          <div className="graphTitle">Produits par mois</div>
          <div style={{width: '100%'}} ref={chartRef}></div>
        </div>
      </div>
      <div className="dashboardLine">
        <div className="dashBoardColum dashGraphCol">
          <div className="graphTitle">Participations par mois</div>
          <div style={{width: '100%'}} ref={participationChartRef}></div>
        </div>
        <div className="dashBoardColum dashCircleGraphCol">
          <div className="graphTitle">Participations par Company</div>
          <div style={{width: '100%'}} ref={companyChartRef}></div>
        </div>
      </div>
      <div className="dashboardLine">
        <div className="dashBoardColum dashCircleGraphCol">
          <div className="graphTitle">Top Participants</div>
          <div style={{width: '100%'}}>
          {topPlayers.map((elem: any, i : number) => (
          <div className="topParticip" key={`tp-${i}`}>
            
            
            <div className="partName">
            <img
              src={
                elem.playerAvatar.startsWith("http")
                  ? elem.playerAvatar
                  : `${API_URL}/${elem.playerAvatar}`
              }
              alt=""
              width="30"
              height="30"
              className="rounded-full mr-1"
              style={{ marginRight : 10}}
            />
            <div className="partNameLabel">{elem.playerName}</div>
            </div>
            <div className="partValue">{elem.totalAmountGiven}</div>
           
          </div>
          ))}
          </div>
        </div>
        <div className="dashBoardColum dashGraphCol">
          <div className="graphTitle">Nouveaux produits</div>
          <div className="lastProdContainer">
          <LastProducts />
          </div>
        </div>
      </div>
     
    
     
    </div>
  );
};

export default Dashboard;
