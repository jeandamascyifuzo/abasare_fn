import React from "react";
import { format } from "date-fns";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image1 from "../../assets/images/svg/ic_stat2.svg";

const Graph = ({ chartData }) => {
  const groups = groupBy(chartData, (entry) => {
    return format(new Date(entry.date), "LLLL");
  });

  const months = Object.entries(groups).map((entry) => {
    const [key, values] = entry;

    return {
      name: key,
      revenue: sumBy(values, "amount"),
    };
  });

  let findTotalRev = [];
  months?.forEach((element) => {
    findTotalRev.push(element.revenue);
  });
  const totalRevenue = findTotalRev.reduce(
    (partialSum, item) => partialSum + item,
    0
  );

  const newData = [
    { name: "January", revenue: 0 },
    { name: "February", revenue: 0 },
    { name: "March", revenue: 0 },
    { name: "April", revenue: 0 },
    { name: "May", revenue: 0 },
    { name: "June", revenue: 0 },
    { name: "July", revenue: 0 },
    { name: "August", revenue: 0 },
    { name: "September", revenue: 0 },
    { name: "October", revenue: 0 },
    { name: "November", revenue: 0 },
    { name: "December", revenue: 0 },
  ];

  var monthName = new Set(months.map((d) => d.name));
  var merged = [...months, ...newData.filter((d) => !monthName.has(d.name))];

  const monthList = [
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
  const sorter = (a, b) => {
    return monthList.indexOf(a.name) - monthList.indexOf(b.name);
  };
  merged.sort(sorter);

  return (
    <div className="col-xl-6 col-xxl-6 col-lg-12 col-md-12">
      <div className="card">
        <div className="card-header border-0 pb-0 d-sm-flex d-block">
          <div>
            <h4 className="card-title mb-1">Revenue</h4>
            {/* <small className="mb-0">
              Lorem ipsum dolor sit amet, consectetur
            </small> */}
          </div>
        </div>

        <div className="card-body revenue-chart px-3 w-full">
          <div className="d-flex align-items-end pr-3 pull-right revenue-chart-bar">
            <div className="d-flex align-items-end mx-32">
              <img
                src={Image1}
                className="mr-2 mb-1 w-[22px] h-[22px]"
                alt=""
              />
              <div>
                <small className="text-dark fs-14">Revenue</small>
                <h3 className="font-w600 mb-0">
                  <span className="counter">{"Rwf" + " " + totalRevenue}</span>
                </h3>
              </div>
            </div>
          </div>
          <div id="chartBar" className="mt-24 w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={merged}>
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2196F3"
                  strokeWidth={3}
                />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
