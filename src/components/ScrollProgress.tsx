import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '2px',
        backgroundColor: '#A31C1B',
        boxShadow: '0 0 10px rgba(163, 28, 27, 0.7)',
        zIndex: 10000,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ScrollProgress;
