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
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        {...register("email")}
        className="form-control"
        id="exampleFormControlInput1"
        placeholder="Email"
      />

      <input
        type="password"
        {...register("password")}
        className="form-control"
        id="exampleFormControlInput1"
        placeholder="Password"
      />

      <input type="submit" />
    </form>
  );
}

export default Login;

