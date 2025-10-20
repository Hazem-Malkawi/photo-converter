
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center p-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        محول الصور الكرتونية
      </h1>
      <p className="text-gray-400 mt-3 text-lg">
        قم بتحميل صورتك واختر نمطًا لتحويلها إلى عمل فني ثلاثي الأبعاد!
      </p>
    </header>
  );
};
