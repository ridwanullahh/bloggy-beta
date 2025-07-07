
import React, { useState, useEffect } from 'react';

interface ReadingProgressProps {
  theme?: any;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({ theme }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200"
      style={{ backgroundColor: theme?.styles.secondaryColor }}
    >
      <div 
        className="h-full transition-all duration-300 ease-out"
        style={{ 
          width: `${progress}%`,
          backgroundColor: theme?.styles.primaryColor || '#3B82F6'
        }}
      />
    </div>
  );
};

export default ReadingProgress;
