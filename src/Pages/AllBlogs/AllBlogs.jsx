// import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { Link } from "react-router-dom";

const AllBlogs = () => {
    const axiosCommon = useAxiosCommon();
    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/blogs`);
            return res.data;
        },
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };
 console.log(blogs)
    const defaultImage = 'https://ibb.co/nLKD1Gg';

    return (
        <div className="w-full dark:bg-gray-800  pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">From The Blog</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Dive into the latest and useful information with our insightful blog posts.
                    </p>
                </div>
                <div
                    className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
                    {blogs
                    .filter(blog =>blog.status === 'published')
                    .map(blog => (
                        <Link
                            to={`/blogDetails/${blog._id}`}
                            key={blog._id}
                            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-700 px-8 py-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                        >
                            <img src={blog?.thumbnail_image ? blog.thumbnail_image : defaultImage} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                <time className="mr-8">{formatDate(blog.createdDate)}</time>
                                <div className="-ml-4 flex items-center gap-x-4">
                                    <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                        <circle cx="1" cy="1" r="1"></circle>
                                    </svg>
                                    <div className="flex gap-x-2.5">
                                        <img src={blog?.photoURL} alt="" className="h-6 w-6 flex-none rounded-full bg-white/10" />{blog?.displayName}
                                    </div>
                                </div>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                                <p><span className="absolute inset-0"></span>{blog.title}</p>
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllBlogs;
