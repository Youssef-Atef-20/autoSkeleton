import React from 'react';
import { useSkeletonConfig } from '../hooks/useSkeletonConfig';

export default function SkeletonElement({
  type = 'text',
  lines = 1,
  width,
  height,
  className = '',
  style = {},
}) {
  const config = useSkeletonConfig();
  const animationClass = config.animation !== 'none' ? `skeleton-${config.animation}` : '';
  const themeClass = config.theme === 'dark' ? 'skeleton-dark' : 'skeleton-light';

  const baseStyle = {
    ...style,
    '--skeleton-duration': `${config.duration}s`,
  };

  if (width !== undefined) baseStyle.width = width;
  if (height !== undefined) baseStyle.height = height;

  const getCombinedClassName = (elType) => {
    return [
      'skeleton-placeholder',
      `skeleton-${elType}`,
      animationClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  };

  // Handle multi-line text blocks
  if ((type === 'text' || type === 'heading') && lines > 1) {
    const lineElements = [];
    for (let i = 0; i < lines; i++) {
      const isLast = i === lines - 1;
      // organic text line widths: 95% -> 90% -> 85% -> 60%
      const defaultWidth = isLast ? '55%' : `${95 - i * 5}%`;
      const lineStyle = {
        ...baseStyle,
        width: width || defaultWidth,
        display: 'block',
      };

      lineElements.push(
        <span
          key={i}
          className={getCombinedClassName('line')}
          style={lineStyle}
        />
      );
    }

    return (
      <span
        className="skeleton-text-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          width: '100%',
        }}
      >
        {lineElements}
      </span>
    );
  }

  // Handle single item (image, button, input, header line)
  const isInline = type === 'text' || type === 'heading';
  const ElementTag = isInline ? 'span' : 'div';

  return (
    <ElementTag
      className={getCombinedClassName(type)}
      style={baseStyle}
    />
  );
}
