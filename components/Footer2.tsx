import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Docs', href: '/docs' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }
    ],
    social: [
      { 
        name: 'GitHub', 
        href: 'https://github.com', 
        icon: Github,
        label: 'Visit our GitHub repository'
      },
      { 
        name: 'Twitter', 
        href: 'https://twitter.com', 
        icon: Twitter,
        label: 'Follow us on Twitter'
      },
      { 
        name: 'Email', 
        href: 'mailto:hello@dsaquest.com', 
        icon: Mail,
        label: 'Send us an email'
      }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white border-t border-emerald-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                🎯
              </div>
              <span className="text-xl font-bold">DSAQuest</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Level up your coding journey with gamified Data Structures & Algorithms learning. 
              Master DSA through interactive challenges and real-world problem solving.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>for developers</span>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-2">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-emerald-400 transition-colors focus:outline-none focus:text-emerald-400 focus:underline"
                      tabIndex={0}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-2">
                {links.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-emerald-400 transition-colors focus:outline-none focus:text-emerald-400 focus:underline"
                      tabIndex={0}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Social & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              Connect
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Join our community and stay updated with the latest challenges, tips, and features.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {links.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  tabIndex={0}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Newsletter Signup (Optional) */}
            <div className="pt-4">
              <label htmlFor="footer-email" className="text-sm font-semibold text-white mb-2 block">
                Newsletter
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Subscribe to newsletter"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p>© {currentYear} DSAQuest — Level up your coding journey.</p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="/sitemap" 
              className="hover:text-emerald-400 transition-colors focus:outline-none focus:text-emerald-400 focus:underline"
              tabIndex={0}
            >
              Sitemap
            </a>
            <a 
              href="/status" 
              className="hover:text-emerald-400 transition-colors focus:outline-none focus:text-emerald-400 focus:underline"
              tabIndex={0}
            >
              Status
            </a>
            <a 
              href="https://github.com/dsaquest" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors focus:outline-none focus:text-emerald-400 focus:underline inline-flex items-center gap-1"
              aria-label="View source code on GitHub"
              tabIndex={0}
            >
              <Github className="w-4 h-4" />
              <span>Open Source</span>
            </a>
          </div>
        </div>

        {/* Tech Stack Badge (Optional Easter Egg) */}
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-600">
            Built with <span className="text-emerald-500 font-semibold">Next.js</span>, 
            <span className="text-blue-400 font-semibold"> TypeScript</span>, 
            <span className="text-cyan-400 font-semibold"> Tailwind CSS</span>, and 
            <span className="text-purple-400 font-semibold"> Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;