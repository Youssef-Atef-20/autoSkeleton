import React, { useMemo } from 'react';
import { SkeletonConfigContext } from '../hooks/useSkeletonConfig';
import { traverse } from '../utils/traverse';
import '../styles/skeleton.css';

/**
 * AutoSkeleton component wraps UI trees and automatically translates
 * them into loading skeletons when `loading` is set to true.
 */
export default function AutoSkeleton({
  children,
  loading = false,
  animation = 'shimmer',
  duration = 1.5,
  theme = 'light',
}) {
  const config = useMemo(
    () => ({
      animation,
      duration,
      theme,
    }),
    [animation, duration, theme]
  );

  // If not loading, render original tree immediately
  if (!loading) {
    return children;
  }

  // Generate skeleton tree dynamically
  const skeletonTree = traverse(children, config);

  return (
    <SkeletonConfigContext.Provider value={config}>
      {skeletonTree}
    </SkeletonConfigContext.Provider>
  );
}
