// src/components/auth/AuthRedirect_Admin.jsx


import { Link } from "react-router-dom";

const AuthRedirect_Admin = () => {
  return (
    <div className="text-center">
      <p className="text-base-content/60">
       Cuenta para administradores?{" "}
        <Link to="/admin" className="link link-primary">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default AuthRedirect_Admin;