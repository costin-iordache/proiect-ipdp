"use client";
import Sidebar from "@/app/components/Sidebar";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkAuth } from "@/backend/auth";
import { createContext, useContext } from "react";

interface AuthContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	userId: number | undefined;
	setUserId: (userId: number | undefined) => void;
	hasLoggedOut: React.RefObject<boolean>;
	justLoggedIn: React.RefObject<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState<number | undefined>(undefined);
	const router = useRouter();
	const pathname = usePathname();
	const hasLoggedOut = useRef(false);
	const justLoggedIn = useRef(false);

	useEffect(() => {
		const verifyAuth = async () => {
			if (justLoggedIn.current) {
				justLoggedIn.current = false;
				return;
			}
			if (
				(pathname !== "/login" &&
					pathname !== "/" &&
					pathname !== "/register") ||
				!hasLoggedOut.current
			) {
				const authResult = await checkAuth();
				setIsLoggedIn(authResult.isLoggedIn);
				setUserId(authResult.userId);
				console.log(
					"AuthProvider - isLoggedIn:",
					authResult.isLoggedIn,
					"userId:",
					authResult.userId
				);
				if (!authResult.isLoggedIn && !authResult.userId) {
					router.push("/login");
				}
			} else {
				setIsLoggedIn(false);
				setUserId(undefined);
				hasLoggedOut.current = false;
				router.push("/login");
			}
		};
		verifyAuth();
	}, [router, pathname]);

	const contextValue: AuthContextType = {
		isLoggedIn: isLoggedIn,
		setIsLoggedIn: setIsLoggedIn,
		userId: userId,
		setUserId: setUserId,
		hasLoggedOut: hasLoggedOut,
		justLoggedIn: justLoggedIn,
	};

	return (
		<>
			<AuthContext.Provider value={contextValue}>
				<Sidebar />
				<main className="flex-1 overflow-auto">{children}</main>
			</AuthContext.Provider>
		</>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
