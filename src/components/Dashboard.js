import React from 'react';
import DashHeader from './DashHeader';
import Sidebar from './sidebar/Sidebar';
import './dashboard.css';

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard flex">
      <DashHeader />
      <Sidebar />
      <div className="dashboard_content"> {children}</div>
    </div>
  );
};

export default Dashboard;
