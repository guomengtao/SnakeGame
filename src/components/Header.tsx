import React from 'react';

export default function Header() {
  return (
    <header className="text-center py-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800">John Doe</h1>
      <p className="text-xl text-gray-600 mt-2">Full Stack Developer</p>
      <div className="flex justify-center gap-4 mt-4 text-gray-600">
        <a href="mailto:john@example.com" className="hover:text-blue-600">john@example.com</a>
        <span>•</span>
        <a href="tel:+1234567890" className="hover:text-blue-600">(123) 456-7890</a>
        <span>•</span>
        <a href="https://github.com" className="hover:text-blue-600">GitHub</a>
      </div>
    </header>
  );
}