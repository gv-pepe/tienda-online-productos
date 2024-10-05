import React from 'react';

const FullScreenImage = ({ src, alt, scrollY }) => {
  const maxScroll = 500; // Máxima cantidad de desplazamiento antes de que la imagen desaparezca

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        overflow: 'hidden',
        zIndex: 1,
        transition: 'opacity 0.3s ease-in-out',
        opacity: Math.max(1 - scrollY / maxScroll, 0), // Reduce la opacidad
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translateY(${Math.min(scrollY, maxScroll)}px)`, // Mueve la imagen hacia arriba
          transition: 'transform 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default FullScreenImage;
