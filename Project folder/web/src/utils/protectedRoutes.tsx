import { Navigate, Route, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </Route>
  );
}
