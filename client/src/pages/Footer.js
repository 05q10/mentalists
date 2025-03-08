import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-500 text-white pt-1 pb-3 mb-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Privacy & Legal */}
        <div className="mb-2 md:mb-0 text-center md:text-left">
          <p>
            <a href="#" className="hover:underline">
              Contact GigWiz
            </a>{" "}
            |
            <a href="#" className="hover:underline">
              {" "}
              Privacy
            </a>{" "}
            |
            <a href="#" className="hover:underline">
              {" "}
              Terms of Use
            </a>{" "}
            |
            <a href="#" className="hover:underline">
              {" "}
              Trademarks
            </a>{" "}
            |
            <a href="#" className="hover:underline">
              {" "}
              About Our Ads
            </a>
          </p>
        </div>

        {/* Middle Section: Social Media */}
        <div className="mb-4 md:mb-0 text-center">
          <p className="mb-2">Follow us on:</p>
          <div className="flex space-x-4 justify-center">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Right Section: Copyright */}
        <div className="text-center md:text-right">
          <p>© GigWiz 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
