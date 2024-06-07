import { Link, NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth.jsx'

const Header = () => {

    const { currentUser, signOut } = useAuth();

    return (
        <header id="header">
            <h1><Link to="/">Travel Journal HAB</Link></h1>
            <nav className="links">
                <ul>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="#">Más votadas</NavLink></li>
                    <li><NavLink to="/posts">Todas</NavLink></li>
                    {
                        !currentUser ? (
                            <>
                                <li><NavLink to="/sign-up">Registrarme</NavLink></li>
                                <li><NavLink to="/sign-in">Ingresar</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/posts/create">Publicar</NavLink></li>
                                <li><NavLink to="/profile">Mi perfil</NavLink></li>
                                <li><NavLink to="#" onClick={signOut}>Salir</NavLink></li>
                            </>
                        )
                    }

                </ul>
            </nav>
            <nav className="main">
                <ul>
                    <li className="search">
                        <a className="fa-search" href="#search">Search</a>
                        <form id="search" method="get" action="#">
                            <input type="text" name="query" placeholder="Search" />
                        </form>
                    </li>
                    <li className="menu">
                        <a className="fa-bars" href="#menu">Menu</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
