import { Footer } from "~/components/footer";
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
      <div className="container px-5 mx-auto pb-14 max-w-7xl">
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
        <Footer
          title="Try out our SEO enhancer."
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit."
        />
      </div>
    </>
  );
}
