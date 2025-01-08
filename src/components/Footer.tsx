import React from "react";
import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiMailSend,
  BiMap,
  BiPhone,
} from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import HelpCenter from "./help-center";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop-all" },
      { label: "Computers", href: "/computers" },
      { label: "Tablets", href: "/tablets" },
      { label: "Mobile", href: "/mobile" },
      { label: "Wearable Tech", href: "/wearable-tech" },
      { label: "Headphones", href: "/headphones" },
      { label: "Speakers", href: "/speakers" },
      { label: "T.V & Home Cinema", href: "/tv-home-cinema" },
      { label: "Sale", href: "/sale" },
      { label: "Drones & Cameras", href: "/drones-cameras" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Policy",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Payment Methods", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
];

const FooterSection: React.FC<FooterSection> = ({ title, links }) => (
  <div className="flex flex-col space-y-4">
    <h4 className="text-lg font-semibold text-primary">{title}</h4>
    <nav aria-label={`${title} links`} className="flex flex-col space-y-2">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-muted-foreground hover:text-primary-bg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  </div>
);

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-primary-bg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
    aria-label={label}
  >
    {icon}
  </a>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 w-full bg-red-600 ">
      <HelpCenter />
      <section className=" py-12 bg-white border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-4">
              <h4 className="text-lg font-semibold text-primary">
                Store Location
              </h4>
              <div className="flex items-start space-x-2">
                <BiMap className="w-5 h-5 text-primary mt-1" />
                <p className="text-muted-foreground">
                  1234 Main Street, City, State 12345, United States
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <BiPhone className="w-5 h-5 text-primary" />
                <p className="text-muted-foreground">123-456-7890</p>
              </div>
              <div className="flex items-center space-x-2">
                <BiMailSend className="w-5 h-5 text-primary" />
                <a
                  href="mailto:info@example.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  info@example.com
                </a>
              </div>
              <div className="flex space-x-4 mt-4">
                <SocialLink
                  href="#"
                  icon={<BiLogoFacebook size={20} />}
                  label="Facebook"
                />
                <SocialLink
                  href="#"
                  icon={<FaSquareXTwitter size={20} />}
                  label="Twitter"
                />
                <SocialLink
                  href="#"
                  icon={<BiLogoInstagram size={20} />}
                  label="Instagram"
                />
                <SocialLink
                  href="#"
                  icon={<BiLogoLinkedin size={20} />}
                  label="LinkedIn"
                />
              </div>
            </div>
            {footerSections.map((section) => (
              <FooterSection key={section.title} {...section} />
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                &copy; {currentYear} Delight Amadi-Sheriff. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground text-center md:text-right">
                Developed by Yours truly. Inspiration from{" "}
                <a
                  href="https://prudhwirajk.wixsite.com/mysite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Wix
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
