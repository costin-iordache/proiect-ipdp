'use client'
import React from "react";

import GetStarted from "@/app/components/GetStarted";
import MySubscriptions from "@/app/components/MySubscriptions";
// import TotalSubscriptions from "@/app/components/TotalSubscriptions";
import MonthOverview from "@/app/components/MonthOverview";
import UpcomingPayments from "@/app/components/UpcomingPayments";
import SearchBar from "@/app/components/SearchBar";

export default function Home() {

  
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-white-500 text-gray-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <SearchBar />
            <GetStarted />
            <MySubscriptions />
          </div>
          <div className="space-y-4">
            <MonthOverview />
            <UpcomingPayments />
          </div>
        </div>
      </div>
    </div>
  );
}
