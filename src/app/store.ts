import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import listSlice from '../features/list/listSlice';
import noteSlice from '../features/note/noteSlice';
export const store = configureStore({
  reducer: {
    showList: listSlice,
    noteList: noteSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
