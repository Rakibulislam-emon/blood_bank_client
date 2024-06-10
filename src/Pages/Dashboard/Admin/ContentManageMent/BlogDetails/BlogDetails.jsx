import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const BlogDetails = () => {
    const blogs = useLoaderData();
    console.log('blogs:', blogs);
    const alt = 'https://ibb.co/nLKD1Gg';

    return (
       <div>
        <Helmet title="Blog Details"/>
         <div className="max-w-screen-xl mx-auto p-5 sm:p-8 md:p-12 relative">
            <div className="bg-cover text-center overflow-hidden" style={{ height: '450px' }}>
                <img src={blogs.image ? blogs.image : alt} alt="Blog Image" className="w-full h-full object-cover" />
            </div>
            <div className="mx-auto ">
                <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                    <div className="p-6">
                        <h1 className="text-4xl text-center py-4">{blogs.title}</h1>
                        <div className="content mt-3" dangerouslySetInnerHTML={{ __html: blogs.blog }} />
                    </div>
                </div>
            </div>
        </div>
       </div>
    );
};

export default BlogDetails;
