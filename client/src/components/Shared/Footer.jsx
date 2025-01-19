import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
   <footer className="bg-gray-900 text-white py-6">
  <div className="container mx-auto px-4">
    {/* Social Media */}
    <h3 className="text-lg font-bold mb-2 text-center">Follow Us</h3>
    <div className="flex justify-center space-x-4">
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

    {/* Bottom Section */}
    <div className="border-t border-blue-500 mt-6 pt-4 text-center">
      <p className="text-sm">&copy; 2025 WalletApp. All Rights Reserved.</p>
    </div>
  </div>
</footer>
  );
};

export default Footer;
