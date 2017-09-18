import React from 'react';
import { Link } from 'react-router';


class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <Link className="navbar-brand" to="/">Home</Link>
      </nav>
    );
  }
}

export default Header;
