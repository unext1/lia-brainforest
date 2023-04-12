const InfoCards = ({
  alignRight,
  title,
  description,
}: {
  alignRight: boolean;
  title: string;
  description: string;
}) => {
  return (
    <div className="grid mt-20 md:grid-cols-3">
      <div className={`my-auto ${alignRight ? "order-2" : ""}`}>
        <h2
          className={`my-auto text-3xl lg:text-4xl font-bold tracking-wide border-red-500  ${
            alignRight
              ? "border-r-[8px] pr-3 text-right"
              : "border-l-[8px] pl-3 text-left"
          }`}
        >
          {title}
        </h2>
        <p className="mt-5 text-base text-gray-600 lg:text-lg ">
          {description}
        </p>
      </div>
      <div
        className={`flex justify-center col-span-2  ${
          alignRight ? "md:justify-start order-1" : "md:justify-end"
        }`}
      >
        <img
          src="https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/5fee94920b94fb4926ca93f458d7a263-1662601653/repair%20manual%20store/create-flat-illustration-for-your-ui-or-web-page.png"
          alt="illustration"
          className="w-[400px] lg:w-[600px] "
        />
      </div>
    </div>
  );
};

export default InfoCards;
