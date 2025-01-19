import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
   <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-10">
  <div className="container mx-auto px-6 flex items-center justify-between h-16">
    {/* Logo (Only for Desktop and Laptop) */}
    <Link to="/" className="hidden lg:block text-lg font-bold ml-12">
      WalletApp
    </Link>

    {/* Mobile Navigation */}
    <div className="flex md:hidden w-full justify-between">
      <p
        className="cursor-pointer hover:text-blue-300"
        onClick={handleLogout}
      >
        Logout
      </p>
    </div>

    {/* Desktop Navigation */}
    <div className="hidden lg:flex">
      <p
        className="cursor-pointer hover:text-blue-300 mr-6"
        onClick={handleLogout}
      >
        Logout
      </p>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
