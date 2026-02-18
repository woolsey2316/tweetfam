// In your store file (e.g., app/hooks.ts)
import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@store/index.js';

// Create a typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
