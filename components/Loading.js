import React from 'react';

export default function Loading() {
  return (
    <div className="text-center mt-5 ">
      <div className="spinner-border loading">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
