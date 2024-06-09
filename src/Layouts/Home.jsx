import { Helmet } from "react-helmet-async";
import Banner from "../Pages/Home/Banner/Banner";
import ContactSection from "../Pages/Home/ContactSection/ContactSection";
import Faq from "../Pages/Home/Faq/Faq";
import Testimonials from "../Pages/Home/Testimonial/Testimonial";
import Network from "../Pages/Home/Network/Network";
import About from "../Pages/Home/About/About";

const Home = () => {
    return (
        <div>
            <Helmet title="home"/>
            <Banner/>
            <Network/>
            <About/>
            <Faq/>
            <ContactSection/>
            <Testimonials/>
        </div>
    );
};

export default Home;