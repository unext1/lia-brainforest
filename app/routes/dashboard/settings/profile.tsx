import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUser } from '~/services/auth.server';
import React, { FC } from 'react';
export async function loader({ request }: LoaderArgs) {
    const user = await requireUser(request);
    return { user };
}

interface ProfileCardProps {
    name: string;
    email: string;
}

const ProfileCard: FC<ProfileCardProps> = ({ name, email }) => {
    return (
        <div className='w-64 bg-white shadow-md rounded-lg overflow-hidden relative'>
            <div className='bg-[#00bd76] h-20'></div>

            <div className='p-4'>
                {/*Hardcoded image replace when added to database*/}
                <img
                    src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'
                    alt='Profile'
                    className='w-20 h-20 rounded-full mx-auto border-2 border-white transform -translate-y-2/3 mb-2'
                    style={{ marginBottom: '-2rem' }}
                />
                <h1 className='text-xl text-center font-semibold mt-0'>
                    {name}
                </h1>
                <p className='text-center text-gray-600'>{email}</p>
                <div className='mt-4 flex justify-around'></div>
            </div>
        </div>
    );
};

interface UserData {
    name: string;
    email: string;
}

const Profile: React.FC = () => {
    const data = useLoaderData<{ user: UserData }>();

    return (
        <div className='flex flex-col'>
            <h2 className='text-xl font-semibold mb-4 mt-4'>Account details</h2>
            <ProfileCard name={data.user.name} email={data.user.email} />
        </div>
    );
};

export default Profile;
