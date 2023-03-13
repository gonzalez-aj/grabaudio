/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image';
import songluetransparent from '../images/songluetransparent.png';
import SearchBar from './SearchBar';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar className="bg-light" expand="lg" id="navbar">
      <Container fluid>
        <Nav.Link href="/"><Image src={songluetransparent} alt="Songlue" width={100} height={50} /></Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shared">Shared Sounds</Nav.Link>
            <NavDropdown title="Create" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/snippet/new">Create Snippet</NavDropdown.Item>
              <NavDropdown.Item href="/song/new">Create Song</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/song/favesong">Fave Songs</Nav.Link>
            <Nav.Link href="/song/yoursongs">Browse Your Songs</Nav.Link>
          </Nav>
          <SearchBar className="d-flex" />

          <Nav.Link href="/profile">
            <Image src={user.photoURL} alt="userURL" width="50px" height="50px" id="navbarprofile" />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
