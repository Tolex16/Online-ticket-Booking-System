import { Navigate } from "react-router-dom";
import isAuthenticated from "./IsAuthenticated";

const PrivateRoute = ({ element: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
