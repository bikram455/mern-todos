import { Route, Routes } from "react-router-dom"
import Todos from "./Todos"
import Login from "./Login"
import Home from "./Home"

const Routing: React.FunctionComponent = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todos" element={<Todos />} />
        </Routes>
    )
}

export default Routing;