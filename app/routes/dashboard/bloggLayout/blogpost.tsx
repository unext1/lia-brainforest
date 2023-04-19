import { Form, Link, useActionData } from '@remix-run/react';
import React, { useState, useEffect } from 'react';
import { ActionArgs, json, redirect } from '@remix-run/node';

const WORDPRESS_API_URL = 'https://test.skibikehike.se/wp-json/wp/v2';

interface BlogpostData {
    title: string;
    topic: string;
}

async function createBlogpost(data: BlogpostData) {
    const response = await fetch(`${WORDPRESS_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: data.title,
            content: data.topic,
            status: 'publish',
        }),
    });

    const json = await response.json();
    return json;
}

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const title = formData.get('title');
    const topic = formData.get('topic');
    const blogpostData = {
        title,
        topic,
    };

    return json(blogpostData);
}

function BlogpostGenerator() {
    const blogpostData = useActionData<BlogpostData>();

    return (
        <>
            <div>
                {blogpostData && (
                    <div>
                        <h1>{blogpostData.title}</h1>
                        <p>{blogpostData.topic}</p>
                    </div>
                )}
            </div>
            <Form method='post'>
                <label>
                    Title:
                    <input type='text' name='title' />
                </label>
                <label>
                    Topic:
                    <input type='text' name='topic' />
                </label>
                <button
                    className='w-fit duration-150 transform flex sm:py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8'
                    type='submit'
                >
                    Generate Blogpost
                </button>
            </Form>
            <Link
                to='/'
                className='bg-blue-500 w-fit transform flex sm:py-2.5 text-white font-bold py-2 px-4 rounded mt-8'
            >
                Back to Dashboard
            </Link>
        </>
    );
}

export default function BlogpostGeneratorRoute() {
    return <BlogpostGenerator />;
}
