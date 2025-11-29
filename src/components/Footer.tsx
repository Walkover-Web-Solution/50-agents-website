'use client';

const Footer = () => {
  return (
    <footer className="border-t border-dark py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          {/* Brand */}
          <div>
            <p className="text-gray-dark text-sm">
              A product by{' '}
              <a
                href="https://walkover.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 font-semibold hover:text-red-600 hover:underline transition-colors duration-200"
              >
                Walkover
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <a
              href="https://50agents.com/help/meeting-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-dark text-sm hover:!text-black hover:underline transition-colors duration-200"
            >
              FAQs
            </a>
            <a
              href="https://50agents.com/help/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-dark text-sm hover:!text-black hover:underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-dark">
          <p className="text-gray-dark text-sm text-center">© 2024 50Agents. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
