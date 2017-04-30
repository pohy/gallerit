import React, {Component} from 'react';
import {
    Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Container
} from 'reactstrap';
import {NavLink as NavLinkRouter, Link} from 'react-router-dom';
import './Header.css';
import Search from './search/Search';

class Header extends Component {
    render() {
        return (
            <Container className="Header" fluid>
                <Navbar color="inverse" inverse fixed="top" toggleable>
                    <NavbarBrand tag={Link} to="/">
                        Galerr.it
                    </NavbarBrand>
                    <Collapse isOpen navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink tag={NavLinkRouter} exact to="/">
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={NavLinkRouter} exact to="/about" disabled>
                                    About
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <Search/>
                </Navbar>
            </Container>
        )
    }
}

export default Header;
