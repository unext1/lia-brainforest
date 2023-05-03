import type { TProfileCard } from "~/types";

export const ProfileCard = ({ name, email, image }: TProfileCard) => {
  return (
    <div className="relative w-64 overflow-hidden bg-white rounded-lg shadow-md">
      <div className="bg-[#00bd76] h-20"></div>

      <div className="p-4">
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
