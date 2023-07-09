import React from "react";
import { useRouter } from "next/router";

type UserProfileProps = {
	params: any;
};

const UserProfile = ({ params }: UserProfileProps) => {
	return <div className="flex h-full w-full justify-center items-center text-xl text-red-500">Profile page {params.userId}</div>;
};

export default UserProfile;
