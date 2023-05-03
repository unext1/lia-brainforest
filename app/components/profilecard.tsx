import type { TProfileCard } from "~/types";

export const ProfileCard = ({ name, email, image }: TProfileCard) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md w-80">
      <div className="h-20 bg-red-500"></div>

      <div className="">
        <img
          src={image}
          alt="Profile"
          className="w-20 h-20 mx-auto -mb-8 transform border-2 border-white rounded-full -translate-y-2/3"
        />
        <h1 className="mt-0 text-xl font-semibold text-center">{name}</h1>
        <p className="text-center text-gray-600">{email}</p>
        <div className="flex justify-around mt-4"></div>
      </div>
    </div>
  );
};
