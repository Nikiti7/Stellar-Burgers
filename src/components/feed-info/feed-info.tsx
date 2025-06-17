import { FC } from 'react';
import { FeedInfoUI } from '../ui/feed-info';
import {
  selectFeedInfo,
  selectOrders
} from '../../services/slices/feed/selectors';
import { useAppSelector } from '../../services/hooks';
import { TOrder } from '../../utils/types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders = useAppSelector(selectOrders);
  const feed = useAppSelector(selectFeedInfo);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
