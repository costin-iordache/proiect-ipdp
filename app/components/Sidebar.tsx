// components/Sidebar.tsx
import { UserIcon, HomeIcon, ChartBarIcon, BellIcon } from "@heroicons/react/24/outline";

const menuItems = [
  { icon: <UserIcon className="w-6 h-6" />, label: "Profile" },
  { icon: <HomeIcon className="w-6 h-6" />, label: "Dashboard" },
  { icon: <ChartBarIcon className="w-6 h-6" />, label: "Stats" },
  { icon: <BellIcon className="w-6 h-6" />, label: "Alerts" },
];

export default function Sidebar() {
  return (
    <aside className="w-20 md:w-24 bg-[#1a152d] text-white py-6 flex flex-col items-center justify-between shadow-xl">
      <div className="space-y-8">
        {menuItems.map((item, idx) => (
          <div key={idx} className="p-3 hover:bg-purple-700 rounded-xl cursor-pointer">
            {item.icon}
          </div>
        ))}
      </div>

      <button className="mb-4 text-xs bg-purple-700 px-2 py-1 rounded-lg">
        Need help?
      </button>
    </aside>
  );
}
