import Btn from "~/components/button";
import InfoCards from "~/components/infoCards";

export default function Index() {
  return (
    <>
      <div className="py-20 bg-black ">
        <div className="container mx-auto max-w-7xl">
          <div>
            <img
              className="mb-10 opacity-95 rounded-3xl"
              src="https://www.upgrad.com/blog/wp-content/uploads/2019/11/118-banner.png"
              alt=""
            />
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
          title="Create a share vision."
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia ea quos, iste culpa nam eligendi aliquam Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Officia ea quos,
            iste culpa nam eligendi aliquam Lorem ipsum dolor, sit amet"
        />
        <InfoCards
          alignRight
          title="Something different."
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
