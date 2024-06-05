import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import useAuth from "../../../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
const BlogCard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/blogs`);
            return res.data;
        },
    });

    // Update blog status
    const updateBlogStatus = async (id, status) => {
        console.log(id, status);
        const res = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/publish-blogs/${id}`, { status });
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            const updatedStatus = status
            toast.success(`${updatedStatus} successful`)
            refetch();
        }
        return res.data;
    }

    // Delete blog
    const deleteBlog = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then ( async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/delete-blogs/${id}`)
                    .then((response) => {
                        console.log(response.data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an error deleting your file.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    return (
        <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
            <div className="absolute inset-0">
                <div className="h-1/3 bg-white sm:h-2/3"></div>
            </div>

            <div className="relative mx-auto max-w-7xl">
                <div className="right-0 absolute flex font-bold text-2xl">
                    <div>
                        <span>Sort by</span>
                        <select name="" className="border-red-500 p-4 border-4 mx-4">
                            <option value="">All</option>
                            <option value="">Published</option>
                            <option value="">Drafts</option>
                        </select>
                    </div>

                    <div className="flex rounded-lg bg-black text-white p-4">
                        <Link to={'/dashboard/add-blog'}>Add Blogs</Link>
                        <IoMdAdd size={40} />
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">BLOGS</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                        Read our recent blog posts
                    </p>
                </div>
                <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                    {data && data.map(blog => (
                        <div key={blog._id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-48 w-full object-cover"
                                    src={`${blog?.thumbnail_image}`}
                                    alt="Article"
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-indigo-600">
                                        <a href="#" className="hover:underline">Article</a>
                                    </p>
                                    <Link to={`blogDetails/${blog._id}`} className="mt-2 block">
                                        <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                                        <p className="mt-3 text-base text-gray-500">
                                            {blog.content.split(' ').slice(0, 20).join(' ')}
                                        </p>
                                    </Link>
                                </div>
                                <div className="flex justify-between">
                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <a>
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={user?.photoURL}
                                                    alt="User"
                                                />
                                            </a>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                <a href="#" className="hover:underline">{user?.displayName}</a>
                                            </p>
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <time dateTime="2020-03-16">Mar 16, 2020</time>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Publish/Unpublish buttons */}
                                    <div className="pt-8">
                                       <button onClick={()=>deleteBlog(blog._id)} className="text-white py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent  hover:bg-[#ff0f17] hover:text[#ff0f17] disabled:opacity-50 disabled:pointer-events-none dark:text-[#ff0f17] dark:hover:bg-red-800-800/30 dark:hover:text-white">Delete</button>
                                        {blog?.status === 'draft' ? (
                                            <button
                                                onClick={() => updateBlogStatus(blog._id, 'published')}
                                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
                                            >
                                                Publish
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => updateBlogStatus(blog._id, 'draft')}
                                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400"
                                            >
                                                Unpublished
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
