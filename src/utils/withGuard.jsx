import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import Loader from "../components/loader"

const withGuard = (Component) => {
  const Wrapper = () => {
    const navigate = useNavigate()
    const { token, role } = useSelector((state) => state.auth)
    const location = useLocation()

    // Routes accessible only without authentication
    const publicOnlyRoutes = [
      "/forget-password",
      "/login",
      "/signup",
      "/reset-password",
      "/activate-account",
    ]

    // Routes that require authentication
    const protectedRoutes = ["/change-password"]

    // Role-based route configurations
    const roleBasedRoutes = {
      Customer: ["/favorite", "/shooping-cart", "/customer-control-panel"],
      Distributor: ["/distributor-control-panel"],
      Delivery: ["/delivery-control-panel"],
      Reviewer: ["/reviewer-control-panel"],
    }

    // Helper: Check if path starts with any route in array
    const matchesRoute = (routes) => {
      return routes.some((route) => {
        // Exact match for routes without params
        if (location.pathname === route) return true
        // Prefix match for routes with params (e.g., /reset-password/:id/:token)
        return location.pathname.startsWith(route + "/")
      })
    }

    // Helper: Check if user has access to current role-based route
    const hasRoleAccess = () => {
      for (const [requiredRole, routes] of Object.entries(roleBasedRoutes)) {
        if (matchesRoute(routes)) {
          // Use role from Redux, fallback to localStorage
          const userRole = role || localStorage.getItem("role")
          return userRole === requiredRole
        }
      }
      return true // Not a role-based route
    }

    useEffect(() => {
      // Redirect authenticated users away from public-only routes
      if (token && matchesRoute(publicOnlyRoutes)) {
        console.log("Redirecting authenticated user from public route")
        navigate("/")
        return
      }

      // Redirect unauthenticated users away from protected routes
      if (!token && matchesRoute(protectedRoutes)) {
        console.log("Redirecting unauthenticated user to login")
        navigate("/login")
        return
      }

      // Check role-based access
      if (!hasRoleAccess()) {
        console.log("User lacks required role for this route")
        navigate("/")
        return
      }
    }, [navigate, token, role, location.pathname])

    // Show loader while checking authentication

    // Render component
    return <Component />
  }

  return Wrapper
}

export default withGuard
