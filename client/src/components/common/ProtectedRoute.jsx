import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, initialized } = useSelector((s) => s.auth);
  if (!initialized && localStorage.getItem("accessToken")) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>;
  }
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}