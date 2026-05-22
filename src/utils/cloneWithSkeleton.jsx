import React from 'react';

/**
 * Clones a React element, stripping interaction event handlers,
 * disabling action elements, and replacing its children with skeleton elements.
 */
export default function cloneWithSkeleton(node, skeletonChildren) {
  if (!React.isValidElement(node)) return node;

  const props = node.props || {};
  const tag = typeof node.type === 'string' ? node.type.toLowerCase() : '';
  const isAction = tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';

  // Strip event handlers to prevent user interactions during loading
  const newProps = { ...props };
  const eventHandlers = [
    'onClick', 'onChange', 'onFocus', 'onBlur',
    'onMouseDown', 'onMouseUp', 'onMouseEnter', 'onMouseLeave',
    'onTouchStart', 'onTouchEnd'
  ];
  
  eventHandlers.forEach(handler => {
    if (newProps[handler]) {
      delete newProps[handler];
    }
  });

  // Handle actions (disable them and block pointer events)
  if (isAction) {
    newProps.disabled = true;
    newProps.style = {
      ...props.style,
      pointerEvents: 'none',
      userSelect: 'none',
    };
  }

  // Force pointer-events: none on any interactive skeleton containers
  if (props.style) {
    newProps.style = {
      ...props.style,
      pointerEvents: 'none',
    };
  } else {
    newProps.style = { pointerEvents: 'none' };
  }

  // For void tags like <input>, React will throw if we pass children,
  // so we render them without children but with skeleton classes/styles
  if (tag === 'input' || tag === 'textarea') {
    return React.cloneElement(node, newProps);
  }

  return React.cloneElement(node, newProps, skeletonChildren);
}
