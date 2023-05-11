import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard";
import { axiosRequest } from "../../api";
import { getUser } from "../utils/common";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

const Sales_URL = "sales";

const Home = () => {

  const getSales = () => {
    axiosRequest
      .get(Sales_URL)
      .then((res) => {
        const response = res.data.data;
        const result = response.filter(
          (element) => element.status === "COMPLETED"
        );
        // setSalesData(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Dashboard>
      <div className="content-body mt-28 ml-56">
        <div className="container-fluid">
          <div className="form-head flex mb-3 items-start">
            <div className="mr-auto d-none d-lg-block">
              <h2 className="text-black font-w500 mb-6">OverView</h2>
              <p className="mb-0">Welcome to Abasare Dashboard!</p>
            </div>
          </div>
          <div className="flex-grow shadow w-96 bg-white rounded-lg p-2 min-w-xs text-black space-y-3 h-32">
            <div className="flex justify-end">
              <div className="flex items-center w-fit min-w-[40px] min-h-[10px] bg-[#FFE7E4] rounded-xl px-2 text-[#2E6C8E]">
                {/* <ArrowUpwardOutlinedIcon className="" /> */}
                {"12.4%"}
              </div>
            </div>
            <div className="flex gap-x-2 space-x-2 ">
              <div className="flex flex-col flex-1">
                <span className="text-gray-400 text-sm font-[400]">
                  {"Available Drivers"}
                </span>
                <span className=" text-xl font-bold">{"10"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
