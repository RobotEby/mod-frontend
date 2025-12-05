import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
/**
 *
 * src/
 └── app/
 │    ├── store.ts
 │    └── hooks.ts
 └── features/
      └── user/
      │     ├── userSlice.ts
      │     ├── userSelectors.ts
      │     └── userThunks.ts
      └── products/
            ├── productsSlice.ts
            ├── productsSelectors.ts
            └── productsThunks.ts

 */
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
