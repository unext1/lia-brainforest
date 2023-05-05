import type { TProfileCard } from "~/types";

export const ProfileCard = ({ name, email, image }: TProfileCard) => {
  return (
    <div className="relative max-w-full overflow-hidden bg-white rounded-lg ">
      <div className="bg-red-500 h-14"></div>

      <div className="">
        <img
          src={image}
          alt="Profile"
          className="w-16 h-16 mx-auto -mb-12 transform border-2 border-white rounded-full -translate-y-2/3"
        />
        <h1 className="mt-0 text-xl font-semibold text-center capitalize">
          {name}
        </h1>
        <p className="text-center text-gray-600">{email}</p>
      </div>
    </div>
  );
};
