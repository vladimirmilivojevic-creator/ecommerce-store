import React, { useState } from 'react';

const ImageWithLoader = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false); // slika je učitana
  };

  return (
    <div className={className} style={{ position: 'relative' }}>
      {isLoading && <div className="spinner"></div>}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={isLoading ? { display: 'none' } : {}}
      />
    </div>
  );
};

export default ImageWithLoader;
