import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authService } from "../AuthService";

export default function AuthGard() {
    const logged = authService.isLogged();
    const location = useLocation();

    useEffect(() => {
        if (!logged && location.pathname !== '/login') {
            window.history.replaceState(null, "", "/login"); 
        }
    }, [logged, location]);

    if (!logged) return <Navigate to="/login" replace />; 

    return <Outlet />;
}
