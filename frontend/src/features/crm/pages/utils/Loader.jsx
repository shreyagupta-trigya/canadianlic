import React from 'react';

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-header">
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fill="black"
            fontSize="24"
            fontWeight="bold"
          >
            L
          </text>
        </svg>
      </div>

      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fill="black"
            fontSize="24"
            fontWeight="bold"
          >
            I
          </text>
        </svg>
      </div>

      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fill="black"
            fontSize="24"
            fontWeight="bold"
          >
            C
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
