import React from 'react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2L19.5 12.5L30 16L19.5 19.5L16 30L12.5 19.5L2 16L12.5 12.5L16 2Z"
            fill="#E31E24"
          />
          <path
            d="M16 8L17.5 13.5L23 15L17.5 16.5L16 22L14.5 16.5L9 15L14.5 13.5L16 8Z"
            fill="#FFD700"
          />
        </svg>
      </div>
      <span className="text-2xl font-bold text-navy">
        Faya<span className="text-primary">Votes</span>
      </span>
    </div>
  );
}
