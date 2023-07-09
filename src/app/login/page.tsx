"use client";
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
	FaEnvelope,
	FaEye,
	FaEyeSlash,
	FaLock,
	FaSpinner,
} from "react-icons/fa";
import Link from "next/link";
import { LoginCredentialType } from "@/constants/types/user.types";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit } = useForm();
	const onSubmit = async (data: LoginCredentialType) => {
		setIsLoading(true);
		setIsLoading(false);
	};

	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
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

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="relative">
						<FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 " />
						<input
							{...register("email")}
							placeholder="Email"
							className="w-full p-3 pl-10 my-2 border border-gray-300 rounded-md focus:border-blue-500"
						/>
					</div>

					<div className="relative">
						<FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 " />
						{showPassword ? (
							<FaEyeSlash
								className="absolute top-1/2 transform -translate-y-1/2 right-3  cursor-pointer"
								onClick={toggleShowPassword}
							/>
						) : (
							<FaEye
								className="absolute top-1/2 transform -translate-y-1/2 right-3  cursor-pointer"
								onClick={toggleShowPassword}
							/>
						)}
						<input
							{...register("password")}
							placeholder="Password"
							type={showPassword ? "text" : "password"}
							className="w-full p-3 pl-10 my-2 border border-gray-300 rounded-md focus:border-blue-500"
						/>
					</div>

					<button
						className="w-full py-3 mt-4 bg-blue-500 text-white rounded-md uppercase relative"
						disabled={isLoading}
					>
						{isLoading && (
							<FaSpinner className="absolute top-1/2 left-3 -translate-y-1/2 animate-spin" />
						)}
						Login
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
		</motion.div>
	);
};

export default Login;
