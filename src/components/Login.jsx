import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    login({ token: `${data.email}:${data.password}` });

    const from = location.state?.from?.pathname;
    navigate(from || "/movies", { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to access your favorites</p>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="login-input"
            placeholder="Email address"
          />

          <input
            type="password"
            {...register("password", { required: true })}
            className="login-input"
            placeholder="Password"
          />

          <button type="submit" className="login-submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

