import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black py-8 border-t border-slate-800">
      <div className="container mx-auto px-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} DopeNope. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-blue-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors text-sm">Contact Us</a>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
