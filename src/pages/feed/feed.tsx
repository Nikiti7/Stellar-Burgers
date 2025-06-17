import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Preloader } from '../../components/ui';
import { FeedUI } from '../../components/ui/pages';
import { selectOrders } from '../../services/slices/feed/selectors';
import { TOrder } from '../../utils/types';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
