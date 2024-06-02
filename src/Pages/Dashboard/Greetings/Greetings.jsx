import useAuth from '../../../Hooks/useAuth';
import './Greetings.css'

const Greetings = () => {
    const {user} = useAuth()
    return (
        <div className="card">
            <div className="first-content">
                <span>WellCome Back</span>
            </div>
            <div className="second-content">
                <span>{user?.displayName}</span>
            </div>


        </div>
    );
};

export default Greetings;