"use client";

import AppLogoLanding from "@/components/shared/AppLogoLanding";
import { useInViewCustom } from "@/hooks/inView/useInViewCustom";

export default function LandingFooter() {
  const { ref, inView } = useInViewCustom();

  return (
    <footer
      ref={ref}
      className={`${
        inView && "fade-in"
      } mt-20 bg-image:(--tg-gradient-card) pt-16 pb-10 rounded-t-[40px]`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo */}

        <div className="mb-6">
          <AppLogoLanding />
        </div>
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Showcase</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">AI Engine</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">API Reference</a>
              </li>
              <li>
                <a href="#">Guides</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Partners</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#E3DFFF] pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} TaskGenius AI. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-purple-500 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-purple-500 transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-purple-500 transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
