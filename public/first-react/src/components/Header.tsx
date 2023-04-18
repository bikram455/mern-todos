import { Link } from "react-router-dom"

const Header: React.FunctionComponent = () => {
    return(
        <div>
            <Link to='/'>Home</Link>
            <Link to='/todos'>Todos</Link>
        </div>
    )
}

export default Header;