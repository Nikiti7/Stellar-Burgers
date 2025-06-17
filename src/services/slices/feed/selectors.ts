import { RootState } from '../../store';

export const selectOrders = (state: RootState) => state.feed.orders;
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedInfo = (state: RootState) => ({
  total: state.feed.total,
  totalToday: state.feed.totalToday
});
