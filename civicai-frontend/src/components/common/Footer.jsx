import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h2 className="text-lg font-semibold text-black tracking-wide">
              CivicAI
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-md leading-relaxed">
              A civic complaint management portal to help citizens raise issues
              and track resolutions quickly, transparently, and efficiently.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              Admin access is restricted.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} CivicAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
