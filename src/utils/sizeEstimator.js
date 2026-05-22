export default function estimateSize(node, type) {
  if (!node) return {};

  const props = node.props || {};
  const style = props.style || {};

  const width = props.width || style.width;
  const height = props.height || style.height;

  const size = {};

  if (width !== undefined) size.width = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) size.height = typeof height === 'number' ? `${height}px` : height;

  if (type === 'heading') {
    const tag = typeof node.type === 'string' ? node.type.toLowerCase() : 'h1';
    const headingHeights = {
      h1: '2.25rem',
      h2: '1.875rem',
      h3: '1.5rem',
      h4: '1.25rem',
      h5: '1.125rem',
      h6: '1rem',
    };
    size.height = size.height || headingHeights[tag] || '1.5rem';
    size.width = size.width || '65%';
  } else if (type === 'text') {
    size.height = size.height || '0.85em';
    
    // Estimate width based on content text length
    const content = props.children || node;
    if (typeof content === 'string' || typeof content === 'number') {
      const length = String(content).trim().length;
      if (length < 8) {
        size.width = size.width || '25%';
      } else if (length < 20) {
        size.width = size.width || '50%';
      } else if (length < 50) {
        size.width = size.width || '75%';
      } else {
        size.width = size.width || '95%';
      }
    } else {
      size.width = size.width || '85%';
    }
  } else if (type === 'button') {
    size.height = size.height || '2.5rem';
    size.width = size.width || '100px';
  } else if (type === 'image') {
    size.width = size.width || '100%';
    size.height = size.height || '180px';
  } else if (type === 'circle') {
    const sizeVal = size.width || size.height || '40px';
    size.width = sizeVal;
    size.height = sizeVal;
    size.borderRadius = '50%';
  } else if (type === 'input') {
    size.height = size.height || '2.25rem';
    size.width = size.width || '100%';
  }

  return size;
}

export function estimateLines(node) {
  if (!node) return 1;
  const tag = typeof node.type === 'string' ? node.type.toLowerCase() : '';
  
  // Paragraph tags are prime candidates for multiple skeleton text lines
  if (tag === 'p' && node.props && node.props.children) {
    const children = node.props.children;
    if (typeof children === 'string') {
      const charCount = children.trim().length;
      if (charCount > 150) return 4;
      if (charCount > 80) return 3;
      if (charCount > 40) return 2;
    }
  }
  return 1;
}
