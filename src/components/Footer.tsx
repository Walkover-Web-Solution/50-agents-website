'use client';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

const productLinks = [
  { label: 'AI Meeting Recorder', href: '/ai-note-taker' },
  { label: 'Work Management', href: '/work-management' },
  { label: 'Agent Templates', href: '/templates' },
  { label: 'AI Agents', href: '/ai-agents' },
  { label: 'Pricing', href: '/pricing' },
];

const resourceLinks = [
  {
    label: 'Chrome Extension',
    href: 'https://chromewebstore.google.com/detail/50-agents/cbnmcgaklkfcengkfcheejpkjghilfio?hl=en-GB&utm_source=meeting-configure',
  },
  { label: 'Browse Integration', href: '/ai-agents' },
  { label: 'Help Center', href: 'https://50agents.com/help' },
  { label: 'Getting Started Guide', href: 'https://50agents.com/help/meeting-agent' },
];

const companyLinks = [
  { label: 'Privacy Policy', href: 'https://50agents.com/help/privacy-policy' },
  { label: 'Careers', href: 'https://walkover.in/careers' },
];

const Footer = () => {
  return (
    <footer className="w-full px-4 md:px-8 border border-dark text-sm">
      <div className="overflow-hidden px-6 md:px-10 lg:px-12 py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-10 md:gap-12 relative z-10 items-start">
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-2">
              <a href="https://50agents.com" className="inline-flex items-center">
                <Image src="/50_agents_logo.png" alt="50Agents" width={180} height={48} className="h-11 w-auto" />
              </a>
              <p className="font-semibold">Build AI Agents for Anything</p>
              <p>Your AI Agents. Your Rules.</p>
            </div>
            <div className="space-y-2">
              <p>
                <a
                  href="https://walkover.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  A product by <span className="font-semibold hover:underline text-red-400 hover:text-red-600">Walkover</span>
                </a>
              </p>
              <p>© {new Date().getFullYear()} 50Agents. All rights reserved.</p>
            </div>
          </div>

          <div className="border border-dark grid grid-cols-1 md:grid-cols-3">
            <div className="px-5 md:px-6 py-5 md:py-6 border-b md:border-b-0 md:border-r border-dark">
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2.5">
                {productLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-gray-light hover:!text-black hover:underline transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-5 md:px-6 py-5 md:py-6 border-b md:border-b-0 md:border-r border-dark">
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2.5">
                {resourceLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-gray-light hover:!text-black hover:underline transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-5 md:px-6 py-5 md:py-6">
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2.5">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-gray-light hover:!text-black hover:underline transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
