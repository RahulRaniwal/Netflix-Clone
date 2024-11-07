import { Github, Linkedin, } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="bg-black py-8 text-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Attribution Text */}
        <p className="text-md md:text-lg">
          Built by Rahul Raniwal 🧑‍💻
        </p>

        {/* Additional Links */}
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/RahulRaniwal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Github size={20} />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/rahul69/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Linkedin size={20} />
            LinkedIn
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} Rahul Raniwal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
