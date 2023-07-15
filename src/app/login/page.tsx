"use client";
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion } from "framer-motion";
import {
	FaEnvelope,
	FaEye,
	FaEyeSlash,
	FaLock,
	FaSpinner,
} from "react-icons/fa";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const router = useRouter();

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			const user = {
				email,
				password,
			};
			const res = await axios.post("/api/users/login", user);
			toast.success("Login Successfully");
			router.push("/profile");
			console.log(res);
		} catch (err: any) {
			toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		setEmailError("");
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setPasswordError("");
	};

	const validate = () => {
		let isValid = true;
		if (!email.trim()) {
			setEmailError("Email is required");
			isValid = false;
		}
		if (!password.trim()) {
			setPasswordError("Password is required");
			isValid = false;
		}
		return isValid;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (validate()) {
			onSubmit(event);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="flex min-h-screen items-center justify-center text-center"
		>
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				className="bg-[#f2e4e4] p-8 rounded-md  w-1/3 text-[#2d3235] shadow-2xl"
			>
				<h1 className="text-2xl font-bold mb-4">Login</h1>

				<form onSubmit={handleSubmit}>
					<div className="relative">
						<FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 " />
						<input
							value={email}
							onChange={handleEmailChange}
							placeholder="Email"
							className={`w-full p-3 pl-10 my-2 border  ${
								emailError ? "border-red-500" : "border-gray-300"
							} rounded-md focus:border-blue-500`}
						/>
						{emailError && (
							<p className="text-red-500 text-sm absolute text-center">
								{emailError}
							</p>
						)}
					</div>

					<div className="relative">
						<FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3  mt-3 " />
						{showPassword ? (
							<FaEyeSlash
								className="absolute top-1/2 transform -translate-y-1/2 right-3 mt-3 cursor-pointer"
								onClick={toggleShowPassword}
							/>
						) : (
							<FaEye
								className="absolute top-1/2 mt-3 transform -translate-y-1/2 right-3  cursor-pointer"
								onClick={toggleShowPassword}
							/>
						)}
						<input
							value={password}
							onChange={handlePasswordChange}
							placeholder="Password"
							type={showPassword ? "text" : "password"}
							className={`w-full p-3 mt-8 pl-10 my-2 border ${
								passwordError ? "border-red-500" : "border-gray-300"
							} rounded-md focus:border-blue-500`}
						/>
						{passwordError && (
							<p className="text-red-500 text-sm absolute">{passwordError}</p>
						)}
					</div>

					<button
						type="submit"
						className={`w-full py-3 mt-6 bg-blue-500 text-white rounded-md uppercase relative `}
						disabled={isLoading}
					>
						{isLoading && (
							<FaSpinner className="absolute  left-3  animate-spin" />
						)}
						{!isLoading && <p>Login</p>}
						{isLoading && <p>Logging..</p>}
					</button>
				</form>

				<p className="my-4 text-sm">
					<Link href="#">
						<span className="text-blue-500 hover:underline">
							Forgot password?
						</span>
					</Link>
				</p>

				<p className="text-sm">
					<span>Don't have an account?</span>
					<Link href="/signup">
						<p className="text-blue-500 hover:underline"> Sign up</p>
					</Link>
				</p>
			</motion.div>
			<Toaster />
		</motion.div>
	);
};
export default Login;
