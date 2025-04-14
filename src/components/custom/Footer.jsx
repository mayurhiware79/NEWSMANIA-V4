import React from "react";
import { Newspaper } from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800  py-10 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Newspaper className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-bold">
                <span className="text-blue-600">News</span>
                <span className="text-red-600">Mania</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A multi-perspective news aggregation platform providing balanced,
              credible news insights from various sources.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">News Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/categories/political"
                  className="text-gray-400 hover:text-green-600 transition-colors"
                >
                  Political
                </a>
              </li>
              <li>
                <a
                  href="/categories/economic"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Economic
                </a>
              </li>
              <li>
                <a
                  href="/categories/social"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Social
                </a>
              </li>
              <li>
                <a
                  href="/categories/international"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  International
                </a>
              </li>
              <li>
                <a
                  href="/categories/technology"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Technology
                </a>
              </li>
              <li>
                <a
                  href="/categories/sports"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Sports
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">News Sources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.thehindu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  The Hindu
                </a>
              </li>
              <li>
                <a
                  href="https://www.bbc.com/news"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  BBC
                </a>
              </li>
              <li>
                <a
                  href="https://www.aljazeera.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Al Jazeera
                </a>
              </li>
              <li>
                <a
                  href="https://www.dainikbhaskar.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Dainik Bhaskar
                </a>
              </li>
              <li>
                <a
                  href="https://timesofindia.indiatimes.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Times of India
                </a>
              </li>
              <li>
                <a
                  href="/sources"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  View All Sources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about-us"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 NewsMania. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="/privacy"
              className="text-gray-400 text-sm hover:text-blue-500 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 text-sm hover:text-blue-500 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="text-gray-400 text-sm hover:text-blue-500 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
