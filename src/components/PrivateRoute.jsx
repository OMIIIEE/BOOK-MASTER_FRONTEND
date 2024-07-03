// // src/components/PrivateRoute.jsx
// import React from "react";
// import { Navigate, Route } from "react-router-dom";
// import { useAuth } from "./log/AuthContext";


// const PrivateRoute = ({ component: Component, roles, ...rest }) => {
//   const { user, isAuthenticated } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (!isAuthenticated) {
//           return <Navigate to="/login" />;
//         }

//         if (roles && !roles.includes(user.role)) {
//           return <Navigate to="/" />;
//         }

//         return <Component {...props} />;
//       }}
//     />
//   );
// };

// export default PrivateRoute;
