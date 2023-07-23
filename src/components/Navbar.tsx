"use client";
import { useEffect, useState } from "react";
import { User } from "@/constants/types/user.types";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { MdLogout } from "react-icons/md";
const Navbar = () => {
	const [user,setUser] = useState<User| null>(null);
	const [isAuth,setIsAuth] = useState<boolean>(false);
	const router = useRouter();
	async function logoutHandler() {
		    setIsAuth(false);
		await axios.get("/api/users/logout");
		toast.success("Logout Successfully");
		router.push("./login");
	}
	const getUserDetails = async () => {
		try {
			const response = await axios.get("/api/users/userinfo");
			const { data } = response.data;
			console.log(data);
			setUser(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		async function isAuthenticated() {
			const res = await axios.get("/api/users/auth");
			const { data } = res.data;
			setIsAuth(data);
		}
		isAuthenticated();

		getUserDetails();
		console.log(isAuth);
	}, [])
	
	return (
		<>
			<div className="fixed inset-0 bg-black opacity-20 h-16"></div>
			<nav className=" fixed w-full z-50 flex items-center justify-around  px-4 py-3 mb-6">
				<div className="text-[#30E3CA] font-bold text-2xl font-mono">
					Next-Auth
				</div>

				{isAuth ? <button
					className="flex items-center px-4 py-2 text-white  bg-gray-800 hover:bg-gray-600 rounded-2xl p-2 transition-colors duration-300 text-base"
					onClick={logoutHandler}
				>
					<MdLogout className="mr-2" />
					Logout
				</button> :
					<button
					className="flex items-center px-4 py-2 text-white  bg-gray-800 hover:bg-gray-600 rounded-2xl p-2 transition-colors duration-300 text-base"
					onClick={()=>router.push('/signup')}
				>
					<MdLogout className="mr-2" />
					Sign Up 
				</button> 
				
				}
			</nav>
			<Toaster />
		</>
	);
};

export default Navbar;
