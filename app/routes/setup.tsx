import {
    redirect,
    type ActionArgs,
    type ActionFunction,
    type LoaderFunction,
} from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { wordpressCookie } from '~/cookie';
import { type WPschema } from '~/types';
export const action: ActionFunction = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    const cookieHeader = request.headers.get('Cookie');
    const cookie = (await wordpressCookie.parse(cookieHeader)) || {};
    /* const urlExists = ; */
    const url = isValidUrl(values.url as string)
        ? new URL(values.url as string)
        : '';
    const username =
        (values.username as string).length > 0
            ? (values.username as string)
            : '';
    const password =
        (values.password as string).length > 0
            ? (values.password as string)
            : '';
    if (url && username && password) {
        try {
            const f = await fetch(`${url}wp-json/wp/v2/media?media_type=image`);
            (await f.json()) as WPschema[];
            const user = {
                username,
                password,
            };
            const tokenFetch = await fetch(`${url}wp-json/jwt-auth/v1/token`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(user),
            });
            const tokenData = await tokenFetch.json();
            cookie.token = tokenData.token;
            cookie.url = url;
            //CREATE TOKEN HERE

            return redirect('/dashboard', {
                headers: {
                    'Set-Cookie': await wordpressCookie.serialize(cookie),
                },
            });
        } catch (err) {
            console.error(err);
            return { error_message: 'url is not a wordpress url.' };
        }
    }
    const usernameError = `${username.length > 0 ? '' : 'username not set'}`;
    const passwordError = `${password.length > 0 ? '' : 'password not set'}`;
    const urlError = `${url ? '' : 'url not valid'}`;
    return { error_message: [usernameError, passwordError, urlError] };
};
export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get('Cookie');
    const cookie = (await wordpressCookie.parse(cookieHeader)) || null;

    if (cookie !== null) {
        return redirect('/dashboard');
    }

    return { url: cookie ? cookie.url : false, cookie: cookie ? true : false };
};
const isValidUrl = (urlString: string) => {
    try {
        return Boolean(new URL(urlString)) && !urlString.endsWith('/');
    } catch (e) {
        return false;
    }
};
export default function Setup() {
    const actionData = useActionData();
    const loaderData = useLoaderData();
    return (
        <div className='h-screen '>
            <div className='grid h-full grid-cols-1 gap-20 p-10 lg:grid-cols-2'>
                <div className='flex flex-col justify-center w-full h-full p-20 bg-gray-100 rounded-lg '>
                    <h2 className='text-3xl font-semibold tracking-wide'>
                        Before you start.
                    </h2>
                    <p className='mt-3 text-sm '>
                        Step 1: Install
                        <a
                            href='https://sv.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/'
                            className='mx-1 text-blue-400'
                        >
                            WP Rest Api Plugin
                        </a>
                        in wordpress plugins.
                    </p>
                    <p className='mt-3 text-sm '>
                        Step 2: Download our
                        <a
                            className='mx-1 text-blue-400'
                            href='/jwt-secret-plugin.zip'
                            download
                        >
                            jwt secret plugin
                        </a>
                        and add the zip file to plugins
                    </p>
                    <p className='mt-3 text-sm '>
                        Step 3: Enter your wordpress url, username and password{' '}
                    </p>
                    <img
                        src='https://envisage.nz/wp-content/uploads/2020/09/web-design-hero1.png'
                        alt='illustration of setup'
                        className='mt-6 '
                    />
                </div>
                <div className='flex flex-col justify-center h-full px-40'>
                    <h2 className='text-3xl font-semibold tracking-wide'>
                        Setup your account.
                    </h2>
                    <p className='mt-2 text-sm text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Repellendus animi hic maiores laudantium corrupti
                        nostrum
                    </p>

                    <Form method='post' className='mt-4'>
                        <div className='flex flex-col w-full gap-2'>
                            <div className='mt-4 '>
                                <label
                                    htmlFor='name'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Wordpress Url
                                </label>
                                <div className='relative mt-1'>
                                    <input
                                        name='url'
                                        type='text'
                                        className='peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6'
                                        placeholder={
                                            loaderData.url
                                                ? loaderData.url
                                                : 'url'
                                        }
                                    />
                                    <div
                                        className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-red-500'
                                        aria-hidden='true'
                                    />
                                </div>
                            </div>
                            <div className='mt-4 '>
                                <label
                                    htmlFor='name'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Username
                                </label>
                                <div className='relative mt-1'>
                                    <input
                                        name='username'
                                        type='text'
                                        className='peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6'
                                        placeholder={
                                            loaderData.username
                                                ? loaderData.username
                                                : 'username'
                                        }
                                    />
                                    <div
                                        className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-red-500'
                                        aria-hidden='true'
                                    />
                                </div>
                            </div>
                            <div className='mt-4 '>
                                <label
                                    htmlFor='name'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Password
                                </label>
                                <div className='relative mt-1'>
                                    <input
                                        name='password'
                                        type='password'
                                        className='peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6'
                                        placeholder='password'
                                    />
                                    <div
                                        className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-red-500'
                                        aria-hidden='true'
                                    />
                                </div>
                            </div>

                            <button
                                className='w-full duration-150 transform hover:scale-95 sm:px-16 sm:py-2.5 mt-2 text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg'
                                type='submit'
                            >
                                Log in
                            </button>
                        </div>
                    </Form>
                </div>
            </div>

            {/* <div className=" max-h-[600px] md:h-[520px] flex flex-col items-center justify-center gap-10 pt-6 mx-10 font-mono md:items-start md:flex-row md:justify-start ">
        <div className=" md:max-w-[50%] min-h-[200px] h-ful rounded-lg pl-4 py-4 pb-8 md:py-0 md:pb-0 flex-col flex">
          <h2 className="text-2xl font-semibold leading-10 ">
            Getting started
          </h2>
          <p>
            Step 1: Install
            <a
              href="https://sv.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/"
              className="text-blue-400"
            >
              WP Rest Api Plugin
            </a>
            in wordpress plugins.
          </p>
          <p>
            Step 2: Download our
            <a className="text-blue-400" href="/jwt-secret-plugin.zip" download>
              jwt secret plugin
            </a>
            and add the zip file to plugins
          </p>
          <p>Step 3: Enter your wordpress url, username and password </p>
          <img
            src="/setup illustration.png"
            alt="illustration of setup"
            className=" max-w-[430px] max-h-[18rem] hidden md:block"
          />
        </div>
        <div className=" min-h-[200px] md:max-w-sm px-4 py-4 md:py-0 rounded-lg h-full">
          {!loaderData.cookie ? (
            <Form className="flex flex-col gap-2 " method="post">
              <h4 className="text-xl font-semibold">Connect your wordpress</h4>
              <input
                name="url"
                className="mt-2 border rounded-sm"
                placeholder={loaderData.url ? loaderData.url : "wordpress url"}
              />
              <input
                name="username"
                className="border rounded-sm"
                placeholder={
                  loaderData.username ? loaderData.username : "username"
                }
              />
              <input
                name="password"
                type="password"
                className="border rounded-sm"
                placeholder="password"
              />
              <button
                className="w-fit duration-150 transform hover:scale-105 flex sm:px-12 sm:py-2.5 mx-auto mt-2  text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-blue-500 rounded-lg"
                type="submit"
              >
                Log in
              </button>
            </Form>
          ) : (
            <div className="mt-2">
              <h5 className="text-lg font-semibold">Hi there,</h5>
              <p>
                you are already setup! But feel free to check the steps again.
              </p>
            </div>
          )}
          {
            <div
              className={`${
                !loaderData.cookie ? "md:mt-10 mt-2 " : "mt-2"
              } text-sm `}
            >
              <p className="">
                *NOTE* We do not use your username and password for anything
                except changing the wordpress image SEO.
              </p>
            </div>
          }
          <div>
            {actionData?.error_message?.map((message: any, id: any) => (
              <p key={id}>{message}</p>
            ))}
          </div>
        </div>
      </div> */}
        </div>
    );
}
