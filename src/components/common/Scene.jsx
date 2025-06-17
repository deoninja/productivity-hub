import React from 'react';

const Scene = ({ data, isPlaying }) => {
  return (
    <div className={`scene ${isPlaying ? 'active' : ''}`}>
      <div className="scene-content">
        <div className="scene-text">
          <h2>{data.title}</h2>
          <p className="description">{data.description}</p>
          <div className="text-content">
            <p>{data.text}</p>
          </div>
        </div>
        <div className="scene-visual">
          <img 
            src={data.image} 
            alt={data.altText}
            className="habit-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Scene;