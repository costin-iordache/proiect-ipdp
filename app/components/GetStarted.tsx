"use client";
import { useAuth } from "@/backend/authContext";

// components/GetStarted.tsx
export default function GetStarted() {
	const { firstName, lastName } = useAuth();

	return (
		<div className="p-6 bg-gradient-to-r from-purple-900 to-purple-700 rounded-2xl shadow-lg text-white">
			<h2 className="text-2xl font-bold mb-2">
				Welcome {firstName} {lastName}, get started with SubsManage
			</h2>
			<p className="text-sm mb-4">
				View, progress and manage subscription efficiently
			</p>
			<button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300">
				+ Add Subscription
			</button>
		</div>
	);
}
