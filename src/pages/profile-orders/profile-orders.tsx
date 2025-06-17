import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectUserOrders } from '../../services/slices/orders/selectors';
import { ProfileOrdersUI } from '../../components/ui/pages';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectUserOrders) ?? [];

  return <ProfileOrdersUI orders={orders} />;
};
