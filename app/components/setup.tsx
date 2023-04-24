export const SetupComponent = () => {
  return (
    <div className="flex flex-col justify-center w-full h-full px-20 bg-gray-100 rounded-lg ">
      <h2 className="text-3xl font-semibold tracking-wide">
        Before you start.
      </h2>
      <p className="mt-3 text-sm ">
        Step 1: Install
        <a
          href="https://sv.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/"
          className="mx-1 text-blue-400"
        >
          WP Rest Api Plugin
        </a>
        in wordpress plugins.
      </p>
      <p className="mt-3 text-sm ">
        Step 2: Download our
        <a
          className="mx-1 text-blue-400"
          href="/jwt-secret-plugin.zip"
          download
        >
          jwt secret plugin
        </a>
        and add the zip file to plugins
      </p>
      <p className="mt-3 text-sm ">
        Step 3: Enter your wordpress url, username and password{" "}
      </p>
      <img
        src="https://envisage.nz/wp-content/uploads/2020/09/web-design-hero1.png"
        alt="illustration of setup"
        className="mt-6 "
      />
    </div>
  );
};
