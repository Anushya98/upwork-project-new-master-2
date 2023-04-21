import React, { useEffect, useState } from "react"
import DonutChart from "react-donut-chart";
import axios from "axios";

const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const DonutCharts = () => {
    const [chartData, setChartData] = useState([])
    const [chartData1, setChartData1] = useState([])
    const [chartData2, setChartData2] = useState([])
    const [chartData3, setChartData3] = useState([])
    

    useEffect(() => {
        axios.get("http://localhost:5000/project", config).then((res => {
            setChartData(res.data.totalProject)
            setChartData1(res.data.completedProject)
            setChartData2(res.data.projectOverdue)
            setChartData3(res.data.canceledProject)
            console.log("Completed Project", res.data.completedProject)
            console.log("Total Project", res.data.totalProject)
            console.log("Overdue Project", res.data.projectOverdue)
            console.log("Canceled Project", res.data.canceledProject)
        }));
    }, []);

    const data = [
        {
          label: "Active",
          value: chartData
        },
        {
          label: "Completed",
          value: chartData1
        },
        {
          label: "Overdue",
          value: chartData2
        },
        {
            label: "Canceled",
            value: chartData3
          }
      ];
      console.log(data);
      const colors = ["#000000", "#60b644", "#d7d720", "#ff4361"];

      return (
        <section className="global-card">
          <div className="section-title">Projects Status</div>
          <div>
          <DonutChart colors={colors} data={data} />
          </div>
          <div className="statistics-wrapper">
            <div className="card">
              <p className="card-title">Active Projects:</p>
              <p className="card-figure">{chartData}</p>
            </div>
  
            <div className="card">
              <p className="card-title ">Completed Projects:</p>
              <p className="card-figure pink-accent">{chartData1}</p>
            </div>
            <div className="card">
              <p className="card-title">Overdue Projects:</p>
              <p className="card-figure green-accent"> {chartData2}</p>
            </div>
            <div className="card">
              <p className="card-title">Canceled Projects:</p>
              <p className="card-figure green-accent"> {chartData3}</p>
            </div>
          </div>
        </section>
      );
}

export default DonutCharts;