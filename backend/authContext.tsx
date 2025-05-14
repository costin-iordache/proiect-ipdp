"use client";
// import Sidebar from "@/app/components/Sidebar";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
// import { checkAuth } from "@/backend/auth";
import { createContext, useContext } from "react";

interface AuthContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	userId: number | undefined;
	setUserId: (userId: number | undefined) => void;
	hasLoggedOut: React.RefObject<boolean>;
	justLoggedIn: React.RefObject<boolean>;
	firstName: string | undefined;
	setFirstName: (firstName: string | undefined) => void;
	lastName: string | undefined;
	setLastName: (lastName: string | undefined) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getAuthData = () => {
	const storedData = localStorage.getItem("authData");
	if (!storedData) {
		return null;
	}
	try {
		const data = JSON.parse(storedData);
		const now = new Date().getTime();
		if (now > data.expiration) {
			console.log("Auth data expired, clearing localStorage.");
			localStorage.removeItem("authData");
			return null;
		}
		return data;
	} catch (e) {
		console.error("Failed to parse auth data from localStorage:", e);
		localStorage.removeItem("authData");
		return null;
	}
};

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState<number | undefined>(undefined);
	const [firstName, setFirstName] = useState<string | undefined>(undefined);
	const [lastName, setLastName] = useState<string | undefined>(undefined);
	const router = useRouter();
	const pathname = usePathname();
	const hasLoggedOut = useRef(false);
	const justLoggedIn = useRef(false);

	useEffect(() => {
		const authData = getAuthData();
		if (authData) {
			console.log(
				"AuthProvider - isLoggedIn:",
				authData.isLoggedIn ? "true" : undefined,
				"userId:",
				authData.userId ? authData.userId : undefined,
				"expiration:",
				authData.expiration ? authData.expiration : undefined
			);
		} else {
			console.log("AuthProvider - No auth data found in localStorage.");
		}
		if (
			(pathname !== "/login" && pathname !== "/" && pathname !== "/register") ||
			!hasLoggedOut.current
		) {
			if (authData) {
				if (authData?.isLoggedIn === "true") {
					setIsLoggedIn(true);
					setUserId(authData.userId);
				} else {
					setIsLoggedIn(false);
					setUserId(undefined);
					router.push("/login");
				}
			}
		} else {
			setIsLoggedIn(false);
			setUserId(undefined);
			hasLoggedOut.current = false;
			router.push("/login");
		}
	}, [pathname, router]);

	// useEffect(() => {
	// 	const verifyAuth = async () => {
	// 		if (justLoggedIn.current) {
	// 			justLoggedIn.current = false;
	// 			return;
	// 		}
	// 		if (
	// 			(	pathname !== "/login" &&
	// 				pathname !== "/" &&
	// 				pathname !== "/register") ||
	// 			!hasLoggedOut.current
	// 		) {
	// 			const authResult = await checkAuth();
	// 			setIsLoggedIn(authResult.isLoggedIn);
	// 			setUserId(authResult.userId);
	// 			setFirstName(authResult.firstName);
	// 			setLastName(authResult.lastName);
	// 			console.log(
	// 				"AuthProvider - isLoggedIn:",
	// 				authResult.isLoggedIn,
	// 				"userId:",
	// 				authResult.userId,
	// 				"firstName:",
	// 				authResult.firstName
	// 			);
	// 			if (
	// 				pathname !== "/login" &&
	// 				pathname !== "/" &&
	// 				pathname !== "/register" &&
	// 				!authResult.isLoggedIn &&
	// 				!authResult.userId
	// 			) {
	// 				router.push("/login");
	// 			}
	// 		} else {
	// 			setIsLoggedIn(false);
	// 			setUserId(undefined);
	// 			hasLoggedOut.current = false;
	// 			router.push("/login");
	// 		}
	// 	};
	// 	verifyAuth();
	// }, [router, pathname]);

	const contextValue: AuthContextType = {
		isLoggedIn: isLoggedIn,
		setIsLoggedIn: setIsLoggedIn,
		userId: userId,
		setUserId: setUserId,
		hasLoggedOut: hasLoggedOut,
		justLoggedIn: justLoggedIn,
		firstName: firstName,
		setFirstName: setFirstName,
		lastName: lastName,
		setLastName: setLastName,
	};

	return (
		<>
			<AuthContext.Provider value={contextValue}>
				{/* <Sidebar /> */}
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
