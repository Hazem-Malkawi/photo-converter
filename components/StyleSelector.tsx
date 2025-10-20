
import React from 'react';
import { CartoonStyle } from '../types';

interface StyleSelectorProps {
  styles: CartoonStyle[];
  selectedStyle: CartoonStyle | null;
  onStyleChange: (style: CartoonStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleChange }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onStyleChange(style)}
          className={`p-4 rounded-lg text-center transition-all duration-300 border-2 ${
            selectedStyle?.id === style.id
              ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg scale-105'
              : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
          }`}
        >
          <div className="text-3xl mb-2">{style.icon}</div>
          <span className="font-semibold">{style.name}</span>
        </button>
      ))}
    </div>
  );
};
