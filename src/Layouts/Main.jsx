import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer/Footer";
import Navbar from "../Components/Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            {/* navbar */}
            <Navbar/>
            {/* outlet */}
            <div className=' min-h-[calc(100vh-440px)]'>
                <Outlet/>
            </div>
            {/* footer */}
            <Footer/>
        </div>
    );
};

export default Main;