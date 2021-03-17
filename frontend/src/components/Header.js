import React from 'react'
import {NavLink} from 'react-router-dom'
import {ReactComponent as Logo} from '../assets/Logo.svg'

const Header = () => {
    return (
        <nav>
            <div className="header-div">
                <div>
                    <Logo/>
                </div>
                <div className="header-nav">
                    <NavLink to='/login'>
                        <button>LOGIN</button>
                    </NavLink>

                    <NavLink to='/cadastro'>
                        <button>CADASTRO</button>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Header;