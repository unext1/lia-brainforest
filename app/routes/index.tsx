import { Link } from "@remix-run/react";
import Btn from "~/components/button";
import InfoCards from "~/components/infoCards";
import Navbar from "~/components/navbar";

export default function Index() {
  return (
    <>
      <Navbar />
      <div className="py-20 bg-black ">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-20 py-32">
            <div className="leading-tight tracking-wide text-white text-8xl">
              Lorem ipsum dolor sit amet
            </div>
            <div className="my-auto">
              <p className="w-4/5 mb-6 text-gray-300 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                ipsum ducimus ipsa maiores, error totam doloremque illum
                corrupti perferendis
              </p>

              <Link
                to="/setup"
                className="w-fit duration-150 transform hover:scale-105  sm:px-10 sm:py-3.5   text-xs px-6 py-2 font-bold text-white  bg-red-500 rounded-lg"
              >
                Start Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-5 pb-40 mx-auto max-w-7xl">
        <div>
          <h1 className="mt-20 text-4xl font-semibold text-center lg:text-5xl">
            Why should you use us
          </h1>
          <p className="mt-2 text-sm text-center text-gray-600 lg:text-base ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia ea
            quos, iste culpa nam eligendi aliquam
          </p>
        </div>

        <InfoCards
          alignRight={false}
          title="Save Time."
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia ea quos, iste culpa nam eligendi aliquam Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Officia ea quos,
            iste culpa nam eligendi aliquam Lorem ipsum dolor, sit amet"
        />
        <InfoCards
          alignRight
          title="Create a share vision."
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia ea quos, iste culpa nam eligendi aliquam Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Officia ea quos,
            iste culpa nam eligendi aliquam Lorem ipsum dolor, sit amet"
        />
        <div className="px-10 py-8 mx-auto mt-20 bg-black sm:py-16 sm:px-20 rounded-3xl">
          <div className="container mx-auto">
            <h1 className="font-bold tracking-wider text-center text-white sm:text-4xl md:text-5xl ">
              Try out our SEO enhancer.
            </h1>
            <p className="mt-5 text-xs text-center text-gray-400 sm:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <Btn title="Setup" link href="/setup" />
          </div>
        </div>
      </div>
    </>
  );
}
