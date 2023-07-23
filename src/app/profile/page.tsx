'use client'
import { useState,useEffect } from 'react';
import { Mail, Phone, User } from 'react-feather';
import { NextPage } from 'next';
import Image from 'next/image';
import { ProfileData } from '@/constants/types/user.types';
import axios from 'axios';
import img1 from './../../../public/vercel.svg'
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US');
};

interface Props {
  profile: ProfileData;
}

const Profile: NextPage<Props> = () => {
	const [profile,setProfile] = useState<ProfileData | any>();
	const [loading,setLoading] = useState(true);
	useEffect(() => {
		async function getProfileDetails() {
			try {
				setLoading(true);
				const response = await axios.get("/api/users/userinfo");
				const { data } = response.data;
				setProfile(data);
			} catch (error) {
				console.log(error);
			}
			finally {
				setLoading(false);
			}
		}
		getProfileDetails(); 
	},[])
	if (loading) {
    	return loading && <h1>loading....</h1>
	}
	return (
	  <div className='h-[100vh] w-full items-center flex px-9 md:px-2'>
    <div
      className="bg-white rounded-lg shadow-lg p-6 sm:p-10 mx-auto max-w-2xl h-max px-9"
    >
      <div className="flex flex-col md:flex-row items-center justify-between  ">
        <div className="w-32 h-32 relative rounded-full overflow-hidden">
          {profile && (
    <Image
      src={img1}
								alt={profile?.fullName}
								className='w-40 h-40 rounded-full'
      width={300}
      height={300}
    />
  )}    
        </div>
        <div className="md:ml-6 mt-6 md:mt-0">
          <h2 className="text-2xl font-bold mb-2">{profile?.fullName}</h2>
          <p className="text-gray-600 text-sm">{profile?.bio.slice(0,300)+'...'}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Personal Information</h3>
          <ul className="text-gray-700">
            <li className="flex items-center mb-2">
              <User className="mr-2" />
              {profile?.gender}
            </li>
            <li className="flex items-center mb-2">
              <Mail className="mr-2" />
              {profile?.email}
            </li>
            <li className="flex items-center">
              <Phone className="mr-2" />
              {profile?.phoneNumber}
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Additional Information</h3>
          <ul className="text-gray-700">
            <li className="flex items-center mb-2">
              <span className="mr-2">Date of Birth:</span>
              {formatDate(profile?.dateOfBirth)}
            </li>
            <li className="flex items-center">
              <span className="mr-2">Interests:</span>
              {profile?.interests.join(', ')}
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Location</h3>
        <p className="text-gray-700">{profile?.city}, {profile?.country}, {profile?.postalCode}</p>
      </div>
</div>
		</div>
  );
};

export default Profile;
