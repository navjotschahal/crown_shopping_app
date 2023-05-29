import React, { Fragment } from 'react';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import './navigation.styles.scss'

const Navigation = () => {
    const { signedinUser } = useContext(UserContext);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to={'/'}>
                    <CrownLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to={'/shop'}>
                        SHOP
                    </Link>
                    {
                        signedinUser ? <span className='nav-link'>Sign-Out</span> : <Link className='nav-link' to={'/auth'}>
                          Sign-In
                    </Link>
                    }
                </div>
            </div>
            <Outlet></Outlet>
        </Fragment>
    );
};

export default Navigation;