import Btn from "./button";

export const Footer = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <footer className="px-10 py-8 mx-auto mt-20 bg-black sm:py-16 sm:px-20 rounded-3xl">
      <div className="container mx-auto">
        <h1 className="font-bold tracking-wider text-center text-white sm:text-4xl md:text-5xl ">
          {title}
        </h1>
        <p className="mt-5 text-xs text-center text-gray-400 sm:text-sm">
          {description}
        </p>

        <Btn title="Setup" link href="/setup" />
      </div>
    </footer>
  );
};
