// components/Sidebar.tsx
"use client";
import {
	UserIcon,
	HomeIcon,
	ChartBarIcon,
	BellIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

export default function Sidebar() {
	const router = useRouter();

	const handleUserProfileClick = () => {
		router.push("/account-settings");
	};
	const handleHomeClick = () => {
		router.push("/home");
	};
	const handleChartClick = () => {
		router.push("/all-subscriptions");
	};
	const handleBellClick = () => {
		router.push("/alerts");
	};

	const menuItems = [
		{
			icon: <HomeIcon className="w-6 h-6" onClick={handleHomeClick} />,
			label: "Dashboard",
		},
		{
			icon: <UserIcon className="w-6 h-6" onClick={handleUserProfileClick} />,
			label: "Profile",
		},
		{ icon: <ChartBarIcon className="w-6 h-6" onClick={handleChartClick} />, label: "Stats" },
		{ icon: <BellIcon className="w-6 h-6" onClick={handleBellClick} />, label: "Alerts" },
	];

	return (
		<div>
			<aside className="w-24 h-full md:w-24 bg-[#1a152d] text-white py-6 flex flex-col items-center justify-between shadow-xl">
				<div className="p-3 rounded-xl cursor-pointer">
					<Image
						src="/logo.png"
						alt="SubWiz Logo"
						height={64}
						width={64}
						className="w-16 h-16 rounded-full"
						onClick={handleHomeClick}
					/>
				</div>

				<div className="space-y-8 justify-center items-center">
					{menuItems.map((item, idx) => (
						<div
							key={idx}
							className="p-3 hover:bg-purple-700 rounded-xl cursor-pointer"
						>
							{item.icon}
						</div>
					))}
				</div>

				<div className="flex flex-col items-center justify-center">
					<LogoutButton />
				</div>
			</aside>
		</div>
	);
}
