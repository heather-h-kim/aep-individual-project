import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Navbar;
