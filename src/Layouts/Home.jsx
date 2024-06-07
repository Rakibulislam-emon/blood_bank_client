import { Helmet } from "react-helmet-async";
import Banner from "../Pages/Home/Banner/Banner";
import ContactSection from "../Pages/Home/ContactSection/ContactSection";
import Faq from "../Pages/Home/Faq/Faq";
import Testimonials from "../Pages/Home/Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet title="home"/>
            <Banner/>
            <Faq/>
            <ContactSection/>
            <Testimonials/>
        </div>
    );
};

export default Home;