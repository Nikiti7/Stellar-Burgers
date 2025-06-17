// components/protected-route/protected-route.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { FC } from 'react';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  component
}) => {
  const location = useLocation();
  const { user, isAuth } = useSelector((state) => state.auth);

  if (!isAuth) {
    return null;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return component;
};
