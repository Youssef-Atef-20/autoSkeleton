import { createContext, useContext } from 'react';

export const SkeletonConfigContext = createContext({
  animation: 'shimmer',
  duration: 1.5,
  theme: 'light',
});

export function useSkeletonConfig() {
  return useContext(SkeletonConfigContext);
}
