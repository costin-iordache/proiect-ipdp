"use client";
// import Sidebar from "@/app/components/Sidebar";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkAuth } from "@/backend/auth";
import { createContext, useContext } from "react";
import Sidebar from "@/app/components/Sidebar";

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
				setFirstName(authResult.firstName);
				setLastName(authResult.lastName);
				console.log(
					"AuthProvider - isLoggedIn:",
					authResult.isLoggedIn,
					"userId:",
					authResult.userId,
					"firstName:",
					authResult.firstName
				);
				if (
					pathname !== "/login" &&
					pathname !== "/" &&
					pathname !== "/register" &&
					!authResult.isLoggedIn &&
					!authResult.userId
				) {
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
		firstName: firstName,
		setFirstName: setFirstName,
		lastName: lastName,
		setLastName: setLastName,
	};

	const hiddenLayoutRoutes = ['/login', '/register'];

	const shouldHideLayout = hiddenLayoutRoutes.includes(pathname);

	return (
		<>
			<AuthContext.Provider value={contextValue}>
				{/* <main className="flex-1 overflow-auto">{children}</main> */}
				<div className="flex">
					{!shouldHideLayout && (
					<>
						<Sidebar />
					</>
				)}
					<div className="flex-1 overflow-auto">{children}</div>
				</div>
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
