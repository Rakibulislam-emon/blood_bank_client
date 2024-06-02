import { Helmet } from "react-helmet-async";
import Banner from "../Pages/Home/Banner/Banner";

const Home = () => {
    return (
        <div>
            <Helmet title="home"/>
            <Banner/>
        </div>
    );
};

export default Home;