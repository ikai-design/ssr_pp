import { useLocation } from 'react-router-dom';
import RootErrorBoundary from './RootErrorBoundary.jsx';

export default function RouteResetErrorBoundary({ children }) {
  const { pathname } = useLocation();
  return <RootErrorBoundary key={pathname}>{children}</RootErrorBoundary>;
}
