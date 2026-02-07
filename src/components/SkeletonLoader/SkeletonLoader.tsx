import React from "react";
import "./SkeletonLoader.css";

interface SkeletonLoaderProps {
  loading?: boolean;
  children: React.ReactNode;
  lines?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  loading = false,
  children,
  lines = 3
}) => {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <div aria-busy="true" aria-live="polite" className="skeleton-wrapper">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="skeleton-line" />
      ))}
    </div>
  );
};
