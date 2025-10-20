
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-8">
      <p className="text-gray-500">
        &copy; {new Date().getFullYear()} محول الصور الكرتونية. تم إنشاؤه بقوة الذكاء الاصطناعي.
      </p>
    </footer>
  );
};
