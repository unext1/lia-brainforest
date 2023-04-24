import { Link } from "@remix-run/react";
import Btn from "~/components/button";
import { Hero } from "~/components/hero";
import InfoCards from "~/components/infoCards";
import Navbar from "~/components/navbar";

export default function Index() {
  return (
    <>
      <Navbar />
      <Hero
        title="Lorem ipsum dolor sit amet"
        description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              ipsum ducimus ipsa maiores, error totam doloremque illum corrupti
              perferendis"
      />
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
          title="Save Money."
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
