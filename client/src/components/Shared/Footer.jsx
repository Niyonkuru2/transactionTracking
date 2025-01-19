import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Links */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Links</h3>
            <ul className="ml-4">
              <li className="mb-1">
                <a href="/" className="hover:underline">
                  Dashboard
                </a>
              </li>
              <li className="mb-1">
                <a href="/transactions" className="hover:underline">
                  Transactions
                </a>
              </li>
              <li className="mb-1">
                <a href="/reports" className="hover:underline">
                  Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook className="h-6 w-6 hover:text-blue-400 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter className="h-6 w-6 hover:text-blue-400 transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="h-6 w-6 hover:text-blue-400 transition" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin className="h-6 w-6 hover:text-blue-400 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-500 mt-6 pt-4 text-center">
          <p className="text-sm">&copy; 2025 WalletApp. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
