import * as React from 'react'
import { NavLink } from 'react-router-dom';
import { UserBarComponent } from './Shared/Auth/UserBarComponent';

export default function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Сервисы</NavLink>
            </div>
            <div style={{marginLeft:'auto'}}>
                <UserBarComponent></UserBarComponent>
            </div>
        </nav>
    );

}