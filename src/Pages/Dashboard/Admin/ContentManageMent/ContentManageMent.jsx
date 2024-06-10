import { Helmet } from "react-helmet-async";
import BlogCard from "./BlogCard/BlogCard";

const ContentManageMent = () => {
    return (
      <div>
        <Helmet title="content-management"/>
        <BlogCard/>
      </div>
    );
};

export default ContentManageMent;
