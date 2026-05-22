import React from 'react';
import detectType from './detectType';
import estimateSize, { estimateLines } from './sizeEstimator';
import cloneWithSkeleton from './cloneWithSkeleton';
import SkeletonElement from '../components/SkeletonElement';

const ReactSharedInternals =
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

// A mock dispatcher to intercept React hooks calls during dry-runs of custom components.
const mockDispatcher = {
  readContext: (ctx) => ctx._currentValue,
  useContext: (ctx) => ctx._currentValue,
  useState: (initial) => {
    const val = typeof initial === 'function' ? initial() : initial;
    return [val, () => {}];
  },
  useReducer: (r, initial, init) => {
    const val = init ? init(initial) : initial;
    return [val, () => {}];
  },
  useRef: (initial) => ({ current: initial }),
  useLayoutEffect: () => {},
  useEffect: () => {},
  useImperativeHandle: () => {},
  useDebugValue: () => {},
  useMemo: (create) => create(),
  useCallback: (cb) => cb,
  useTransition: () => [false, () => {}],
  useDeferredValue: (val) => val,
  useId: () => 'auto-skeleton-id',
  useSyncExternalStore: (s, get) => get(),
  useActionState: (a, initial) => [initial, () => {}, false],
  useOptimistic: (passthrough) => [passthrough, () => {}],
  use: (usable) => {
    if (usable && typeof usable.then === 'function') return undefined;
    if (usable && usable._context) return usable._context._currentValue;
    return undefined;
  }
};

/**
 * Executes a functional or class component's render function in a safe,
 * hook-mocked environment, returning its rendered React elements.
 */
function renderComponent(node) {
  let targetType = node.type;
  const props = node.props || {};

  // Resolve React.memo or React.forwardRef wrappers
  if (targetType && typeof targetType === 'object') {
    if (targetType.type) {
      targetType = targetType.type;
    } else if (targetType.render) {
      targetType = targetType.render;
    }
  }

  if (typeof targetType !== 'function') {
    return null;
  }

  // Handle Class Components
  if (targetType.prototype && targetType.prototype.isReactComponent) {
    try {
      const instance = new targetType(props);
      instance.state = instance.state || {};
      return instance.render();
    } catch (e) {
      console.warn('AutoSkeleton: Failed to render class component:', targetType.name, e);
      return null;
    }
  }

  // Handle Functional Components (with hook mocking)
  if (ReactSharedInternals && ReactSharedInternals.H) {
    const prevDispatcher = ReactSharedInternals.H;
    ReactSharedInternals.H = mockDispatcher;
    try {
      // Functional component or forwardRef renderer
      return targetType(props, props.ref || null);
    } catch (e) {
      console.warn('AutoSkeleton: Failed to render functional component with hooks:', targetType.name, e);
      return null;
    } finally {
      ReactSharedInternals.H = prevDispatcher;
    }
  } else {
    try {
      return targetType(props, props.ref || null);
    } catch (e) {
      console.warn('AutoSkeleton: Failed to render functional component:', targetType.name, e);
      return null;
    }
  }
}

/**
 * Traverses React nodes and replaces original content with skeleton blocks.
 */
export function traverse(node, config, depth = 0) {
  if (depth > 20) return null; // Avoid recursion limits
  if (node === null || node === undefined || typeof node === 'boolean') {
    return null;
  }

  // Handle arrays/children list
  if (Array.isArray(node)) {
    return React.Children.map(node, (child) => traverse(child, config, depth));
  }

  // Handle strings & numbers (direct text content)
  if (typeof node === 'string' || typeof node === 'number') {
    const str = String(node).trim();
    if (str.length === 0) return null;
    // Replace raw text with a simple inline skeleton block
    const estimated = estimateSize(node, 'text');
    return (
      <SkeletonElement
        type="text"
        width={estimated.width}
        height={estimated.height}
      />
    );
  }

  // Ensure node is a valid React element
  if (!React.isValidElement(node)) {
    return node;
  }

  const props = node.props || {};

  // Check for React Fragment or special provider wrapper objects
  if (node.type === React.Fragment || (typeof node.type === 'object' && !node.type.type && !node.type.render)) {
    if (props.children) {
      return traverse(props.children, config, depth + 1);
    }
    return null;
  }

  // Check if it is a custom Component (Function or Class)
  if (typeof node.type === 'function' || (typeof node.type === 'object' && (node.type.type || node.type.render))) {
    const renderedTree = renderComponent(node);
    if (renderedTree) {
      return traverse(renderedTree, config, depth + 1);
    }
    // Fallback: If component rendering fails, generate a block placeholder
    const estimated = estimateSize(node, 'image');
    return (
      <SkeletonElement
        type="image"
        width={estimated.width}
        height={estimated.height}
      />
    );
  }

  // Determine what type of DOM element this is
  const elementType = detectType(node);

  if (elementType === 'ignore') {
    return node; // Render original element as-is
  }

  if (elementType === 'heading' || elementType === 'text') {
    const lines = estimateLines(node);
    const estimated = estimateSize(node, elementType);
    
    // For text nodes, clone parent container (e.g. <p>) but swap children with text skeleton
    const skeletonChildren = (
      <SkeletonElement
        type={elementType}
        lines={lines}
        width={estimated.width}
        height={estimated.height}
      />
    );
    return cloneWithSkeleton(node, skeletonChildren);
  }

  if (elementType === 'image' || elementType === 'circle') {
    const estimated = estimateSize(node, elementType);
    
    // Replace media with a SkeletonElement, copying classNames/styles
    return (
      <SkeletonElement
        type={elementType}
        className={props.className}
        style={props.style}
        width={estimated.width}
        height={estimated.height}
      />
    );
  }

  if (elementType === 'button') {
    const estimated = estimateSize(node, 'button');
    const skeletonChildren = (
      <SkeletonElement
        type="button"
        width={estimated.width || '100%'}
        height={estimated.height || '100%'}
      />
    );
    return cloneWithSkeleton(node, skeletonChildren);
  }

  if (elementType === 'input') {
    const estimated = estimateSize(node, 'input');
    return (
      <SkeletonElement
        type="input"
        className={props.className}
        style={props.style}
        width={estimated.width}
        height={estimated.height}
      />
    );
  }

  // By default, treat as a container (div, span, section, etc.)
  // We keep the container layout intact and traverse its children
  if (props.children) {
    const traversedChildren = traverse(props.children, config, depth + 1);
    return cloneWithSkeleton(node, traversedChildren);
  }

  return cloneWithSkeleton(node, null);
}
