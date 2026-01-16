import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 mt-20 py-6 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} JobTracker. All rights reserved.</p>
      <p>Built to simplify your job tracking.</p>
      <p>
        Crafted with <a href="https://claude.com/product/claude-code" target="_blank" rel="noopener noreferrer">❤️</a> by {" "}
        <a
          href="https://github.com/miqdadv"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-[#ff7171] transition"
        >
          Miqdad
        </a>
      </p>
    </div>
  );
};

export default Footer;
