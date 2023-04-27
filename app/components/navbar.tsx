import { Link } from "@remix-run/react";

const Navbar = () => {
  return (
    <div className="fixed w-full py-4 bg-black">
      <div className="container flex justify-between px-5 mx-auto max-w-7xl">
        <div>
          <h1 className="font-bold text-white">AI App</h1>
        </div>
        <div>
          <Link
            to="/login"
            className="w-fit duration-150 transform hover:scale-105 flex sm:px-6 sm:py-1.5 mx-auto  text-xs px-4 py-1 font-bold text-white uppercase bg-red-500 rounded-lg"
          >
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
