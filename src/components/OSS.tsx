// src/components/OSS.tsx
import React from 'react';
import { OSS } from '../types';

interface OSSProps {
  oss: OSS[];
}

export default function OSSSection({ oss }: OSSProps) {
  return (
    <section>
      <h3 className="section-title" data-i18n="section.oss">Open Source</h3>
      {oss.map((item, index) => (
        <div key={index} className="oss-item">
          <div className="oss-title">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </div>
          <div className="oss-description">
            <span data-i18n={`oss.${item.title.toLowerCase().replace(' ', '_')}.desc`}>
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
