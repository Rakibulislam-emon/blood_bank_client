import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { imageUpload } from '../../../../../Components/Utils';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const AddBlogs = () => {
    const {user} = useAuth()
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const axiosSecure = useAxiosSecure()
    const config = {
        readonly: false,
        height: 300,
    };

    const handlePost =async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.image.files[0];
        const blog = content;
        const createdDate = new Date()
        console.log(title, image, blog ,createdDate);


        try {
            const image_url = await imageUpload(image)
            console.log(image_url);
            const blogInfo = {
                title,
                image: image_url,
                blog,
                createdDate,
                creatorName: user?.displayName,
                creatorImage : user?.photoURL,
                status: 'draft'
            };
            const res = await axiosSecure.post('blogs',blogInfo)
            console.log(res.data);
             if (res.data.insertedId ) {
                toast.success('blog added')
             }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}
        >
            <Helmet title='add-blogs'/>
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
                        Create a New Blog
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">Fill out the form to create a new blog post.</p>
                </div>
                <form
                    onSubmit={handlePost}
                    className="mt-8 space-y-3"
                >
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Title</label>
                        <input
                            name="title"
                            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            type="text"
                            placeholder="Title"
                        />
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                        <img
                                            className="has-mask h-36 object-center"
                                            src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                                            alt="freepik"
                                        />
                                    </div>
                                    <p className="pointer-none text-gray-500">
                                        <span className="text-sm">Drag and drop</span> files here
                                        <br /> or select a file from your computer
                                    </p>
                                </div>
                                <input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300">
                        <span>File type: doc, pdf, types of images</span>
                    </p>
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Content</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            onBlur={newContent => setContent(newContent)} // preferred to update onBlur
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide
                            font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
            <style>
                {`
                    .has-mask {
                        position: absolute;
                        clip: rect(10px, 150px, 130px, 10px);
                    }
                `}
            </style>
        </div>
    );
};

export default AddBlogs;
