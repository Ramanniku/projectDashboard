import React from "react";
import { useSelector } from "react-redux";

import data from "../Store/data.json";
import Navbar from "../Utility/Navbar";
import Header from "../Utility/Header";
import Table from "../Utility/Table";
import DashboardFooter from "../Utility/Footer";

import SalesStats from "../Report/SalesState";
import PaymentChart from "../PaymentChart";

function SalesReport() {
  const user = useSelector((state) => state.auth.user);
  const { stats, pipeline, forecast, leads } = data.salesReport;
  const isSidebarExpanded = useSelector(
    (state) => state.ui.isSidebarExpanded
  );

  const leadActions = () => (
    <button className="text-gray-400 hover:text-gray-600">⋮</button>
  );

  const leadColumns = [
    {
      header: "Lead Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.user.avatar}
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <div>
            <p className="font-medium">{row.user.name}</p>
            <p className="text-xs text-gray-500">{row.user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Company",
      render: (row) => (
        <span className="px-3 py-1 bg-gray-100 rounded-md text-xs">
          {row.company}
        </span>
      ),
    },
    { header: "Amount", accessor: "amount" },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-md text-xs font-medium ${
            row.statusType === "success"
              ? "bg-green-100 text-green-600"
              : row.statusType === "info"
              ? "bg-blue-100 text-blue-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Stage",
      render: (row) => (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${row.stage}%` }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-full bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <Header
          title="Sales Report"
          subtitle="Reports / Sales"
          user={user}
        />

        <div
          className="pt-[100px] px-6"
          style={{
            paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem",
          }}
        >

          {/* ===== TOP STATS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-4">
            {stats.map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow">
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-2xl font-bold mt-2">{item.value}</h2>

                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.positive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.change}
                  </span>
                  <span className="text-xs text-gray-400">
                    vs last month: {item.last}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ===== PIPELINE + FORECAST ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  {/* SALES PIPELINE */}
  <div className="xl:col-span-2">
    <PaymentChart
      title="Sales Pipeline"
      data={data.salesPipelineChart}
    />
  </div>

  {/* REVENUE FORECAST (right side stays same) */}
  <div className="bg-white rounded-xl p-6 shadow text-center">
    ...
  </div>
</div>


    

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* LEFT SIDE */}
            <SalesStats />

            {/* RIGHT SIDE TABLE */}
            <div className="xl:col-span-2 glass-effect border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-4">
                Contact Leads
              </h3>

              <Table
                data={data.contactLeads}
                columns={leadColumns}
                actions={leadActions}
              />
            </div>
          </div>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default SalesReport;
