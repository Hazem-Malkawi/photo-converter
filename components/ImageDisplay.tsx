
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  title: string;
}

const PlaceholderIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, title }) => {
  return (
    <div className="w-full aspect-square bg-gray-700/50 rounded-lg flex justify-center items-center p-2 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/50 flex justify-center items-center z-10">
          <LoadingSpinner />
        </div>
      )}
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="h-full w-full object-contain rounded-md" />
      ) : (
        <div className="text-center text-gray-500">
          <PlaceholderIcon />
          <p className="mt-2">{title}</p>
        </div>
      )}
    </div>
  );
};
