import { Link } from '@remix-run/react';

export const Hero = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <div className='py-20 bg-black '>
            <div className='container mx-auto max-w-7xl'>
                <div className='grid grid-cols-2 gap-20 py-32'>
                    <div className='leading-tight tracking-wide text-white text-8xl'>
                        {title}
                    </div>
                    <div className='my-auto'>
                        <p className='w-4/5 mb-6 text-gray-300 '>
                            {description}
                        </p>

                        <Link
                            to='/login'
                            className='w-fit duration-150 transform hover:scale-105  sm:px-10 sm:py-3.5   text-xs px-6 py-2 font-bold text-white  bg-red-500 rounded-lg'
                        >
                            START NOW
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
