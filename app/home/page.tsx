import GetStarted from "@/components/GetStarted";
import MySubscriptions from "@/components/MySubscriptions";
import TotalSubscriptions from "@/components/TotalSubscriptions";
import MonthOverview from "@/components/MonthOverview";
import UpcomingPayments from "@/components/UpcomingPayments";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <SearchBar />
            <GetStarted />
            <MySubscriptions />
            <TotalSubscriptions />
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
