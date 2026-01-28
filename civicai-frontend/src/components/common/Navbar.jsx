import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-black"
    }`;

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        

        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-lg sm:text-xl font-semibold text-black tracking-wide">
            CivicAI
          </span>
          <span className="text-xs text-gray-500">
            Civic Problem Management Portal
          </span>
        </Link>


        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/user/raise" className={navLinkClass}>
            Raise Issue
          </NavLink>

          <NavLink to="/user/track" className={navLinkClass}>
            Track by ID
          </NavLink>

          <NavLink to="/user/my-complaints" className={navLinkClass}>
            Track by Email
          </NavLink>

          <NavLink
            to="/admin/login"
            className={({ isActive }) =>
              `ml-2 px-4 py-2 rounded-md text-sm font-semibold transition border ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`
            }
          >
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
