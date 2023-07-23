"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { User } from "@/constants/types/user.types";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Upload } from "upload-js";
const upload = Upload({ apiKey: "public_FW25bUEdfXYrS2XjA4bVP3sb43pa" });
import Avatar from "react-avatar";
import Image from "next/image";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
const SignUp = () => {
	const router = useRouter();
	const [user, setUser] = useState<User>({
		email: "",
		password: "",
		fullName: "",
		userName: "",
		profileImg: "",
		dateOfBirth: "",
		phoneNumber: "",
		country: "",
		city: "",
		stateOrProvince: "",
		postalCode: "",
		gender: "",
		interests: [],
		bio: "",
	});
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>();

	const onSubmit = async (data: User) => {
		data.profileImg = user.profileImg;
		setUser(data);
		try {
			setLoading(true);
			const res = await axios.post("api/users/signup", {...data,profileImg:"ago"});
			console.log("SignUp successfully" + res.data);
			toast.success("Sign Up successfully", {
				position: "top-right",
			});

			toast.success("Redirecting to Login...", {
				position: "top-center",
				style: {
					background: "blue",
					color: "white",
				},
			});
			setTimeout(() => {
				router.push("/login");
			}, 1000);
		} catch (error: any) {
			console.error(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.password.length > 0 &&
			user.userName.length > 0
		) {
			setIsButtonDisabled(true);
		} else {
			setIsButtonDisabled(true);
		}
	}, [user]);

	const handleAvatarChange = async (e: any) => {
		const [file] = e.target.files;
		const formData = new FormData();
		formData.append("image", file);
		const { fileUrl } = await upload.uploadFile(file, {
			onProgress(status) {},
		});
		setUser((prevUser) => ({
			...prevUser,
			profileImg: fileUrl as string,
		}));
	};

	return (
		<div className="flex min-h-screen items-center justify-center   ">
			<div className="bg-[#F4D3D3] p-8 mt-5 mb-5 rounded-md shadow-md  ">
				<h1 className="text-2xl font-bold mb-4 text-[#4F709C]">Sign Up</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="flex w-full items-center justify-center"
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="bg-[#8eb3ff] p-8 rounded-md  w-full shadow-2xl text-[#2d3235] "
						>
							<div className="w-full h-full flex flex-row gap-4 flex-wrap justify-center">
								<div className="flex flex-col-reverse justify-around p-3 h-full">
									<div className="mb-4">
										<label htmlFor="email" className="block  font-bold mb-2">
											Email
										</label>
										<input
											type="email"
											id="email"
											{...register("email", { required: "Email is required" })}
											className="border rounded px-3 py-2 w-full"
											placeholder="Your Email"
										/>
										<ErrorMessage
											errors={errors}
											name="email"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 relative">{message}</span>
											)}
										/>
									</div>
									<div className="mb-4">
										<label htmlFor="password" className="block  font-bold mb-2">
											Password
										</label>
										<input
											type="password"
											id="password"
											{...register("password", {
												required: "Password is required",
											})}
											className="border rounded px-3 py-2 w-full"
											placeholder="Your Password"
										/>
										<ErrorMessage
											errors={errors}
											name="password"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 relative">{message}</span>
											)}
										/>
									</div>
									<div className="mb-4">
										<label htmlFor="fullName" className="block  font-bold mb-2">
											Full Name
										</label>
										<input
											type="text"
											id="fullName"
											{...register("fullName", {
												required: "Full Name is required",
											})}
											className="border rounded px-3 py-2 w-full"
											placeholder="Your Full Name"
										/>
										<ErrorMessage
											errors={errors}
											name="fullName"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 relative">{message}</span>
											)}
										/>
									</div>
									<div className="mb-0 mt-6">
										<label htmlFor="userName" className="block  font-bold mb-2">
											Username
										</label>
										<input
											type="text"
											id="userName"
											{...register("userName", {
												required: "Username is required",
											})}
											className="border rounded px-3 py-2 w-full"
											placeholder="Your User Name"
										/>
										<ErrorMessage
											errors={errors}
											name="userName"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 relative">{message}</span>
											)}
										/>
									</div>
									<div className="mb-4 -mt-4">
										<label
											htmlFor="profileImg"
											className="block  font-bold mb-2"
										>
											Profile Picture
										</label>
										<div className="flex flex-col items-center justify-around p-3 text-center">
											<div className="relative w-32 h-32 mb-4">
												{user.profileImg ? (
													<Image
														src={user.profileImg}
														alt={user.fullName}
														className="w-full h-full mt-4 object-cover rounded-full"
														width={800}
														height={800}
													/>
												) : (
													<Avatar
														name={user.fullName}
														size={"100%"}
														round={true}
													/>
												)}
											</div>
											<label className="block text-[#116A7B] font-bold mb-2 cursor-pointer">
												Change Profile Picture
												<input
													type="file"
													onChange={handleAvatarChange}
													className="hidden"
												/>
											</label>
										</div>
									</div>
								</div>
								<div className="flex flex-col justify-center">
									<div className="mb-4">
										<label
											htmlFor="dateOfBirth"
											className="block  font-bold mb-2"
										>
											Date of Birth
										</label>
										<input
											type="date"
											id="dateOfBirth"
											{...register("dateOfBirth", {
												required: "Date of Birth is required",
											})}
											className="border rounded px-3 py-2 w-full"
										/>
										<ErrorMessage
											errors={errors}
											name="dateOfBirth"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 relative">{message}</span>
											)}
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="phoneNumber"
											className="block  font-bold mb-2"
											placeholder="Your Phone Number"
										>
											Phone Number
										</label>
										<input
											type="tel"
											id="phoneNumber"
											{...register("phoneNumber", {
												required: "Phone Number is required",
											})}
											className="border rounded px-3 py-2 w-full"
										/>
										<ErrorMessage
											errors={errors}
											name="phoneNumber"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 static">{message}</span>
											)}
										/>
									</div>
									<div className="mb-4">
										<label htmlFor="country" className="block  font-bold mb-2">
											Country
										</label>
										<input
											type="text"
											id="country"
											{...register("country", {
												required: "Country is required",
											})}
											className="border rounded px-3 py-2 w-full"
											placeholder="Your Country Name"
										/>
										<ErrorMessage
											errors={errors}
											name="country"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 relative">{message}</span>
											)}
										/>
									</div>
									<div className="mb-4">
										<label htmlFor="city" className="block  font-bold mb-2">
											City
										</label>
										<input
											type="text"
											id="city"
											{...register("city", { required: "City is required" })}
											className="border rounded px-3 py-2 w-full"
											placeholder="Your City Name"
										/>
										<ErrorMessage
											errors={errors}
											name="city"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 relative">{message}</span>
											)}
										/>
									</div>

									<div className="mb-4">
										<label
											htmlFor="postalCode"
											className="block  font-bold mb-2"
										>
											Postal Code
										</label>
										<input
											type="text"
											id="postalCode"
											{...register("postalCode", {
												required: "Postal Code is required",
											})}
											className="border rounded px-3 py-2 w-full"
											placeholder="Your Postal Code"
										/>
										<ErrorMessage
											errors={errors}
											name="postalCode"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 relative">{message}</span>
											)}
										/>
									</div>
									<div className="mb-4">
										<label htmlFor="gender" className="block  font-bold mb-2">
											Gender
										</label>
										<select
											id="gender"
											{...register("gender", {
												required: "Gender is required",
											})}
											className="border rounded px-3 py-2 w-full"
										>
											<option value="">Select Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
											<option value="Other">Other</option>
										</select>
										<ErrorMessage
											errors={errors}
											name="gender"
											render={({ message }: { message: string }) => (
												<span className="text-red-500 relative">{message}</span>
											)}
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="interests"
											className="block  font-bold mb-2"
										>
											Interests
										</label>
										<div className="flex flex-wrap">
											<label className="mr-4">
												<input
													type="checkbox"
													{...register("interests")}
													value="Sports"
												/>
												<span className="ml-2">Sports</span>
											</label>
											<label className="mr-4">
												<input
													type="checkbox"
													{...register("interests")}
													value="Music"
												/>
												<span className="ml-2">Music</span>
											</label>
											<label className="mr-4">
												<input
													type="checkbox"
													{...register("interests")}
													value="Art"
												/>
												<span className="ml-2">Art</span>
											</label>
											<label className="mr-4">
												<input
													type="checkbox"
													{...register("interests")}
													value="Travel"
												/>
												<span className="ml-2">Travel</span>
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className="mb-4">
								<label htmlFor="bio" className="block  font-bold mb-2">
									Bio
								</label>
								<textarea
									id="bio"
									{...register("bio", { required: "Bio is required" })}
									className="border rounded px-3 py-2 w-full h-12"
									placeholder="Your Bio goes here"
								></textarea>
								<ErrorMessage
									errors={errors}
									name="bio"
									render={({ message }: { message: string }) => (
										<span className="text-red-500 static">{message}</span>
									)}
								/>
							</div>
							<div className="text-center flex justify-center">
								<button
									className="bg-blue-500 text-white py-2 px-4 rounded"
									// disabled={isButtonDisabled}
								>
									Sign Up
								</button>
							</div>
						</motion.div>
					</motion.div>
				</form>
				<p className="mt-4 text-center">
					Already have an account?
					<Link href="/login">
						<p className="text-blue-500">Log in</p>
					</Link>
				</p>
			</div>
			<Toaster />
		</div>
	);
};
export default SignUp;
