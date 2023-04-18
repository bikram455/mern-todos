import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Home = () => {
    // const navigate: NavigateFunction = useNavigate();
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if(!token) {
    //         navigate('/login');
    //     }
    // }, []);

    return(
        <div>
            This is homess component!
        </div>
    )
}

export default Home;