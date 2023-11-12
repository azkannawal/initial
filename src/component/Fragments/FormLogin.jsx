import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import IndexInput from "../Elements/Inputform";
import { login } from "../../services/auth.services";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setLoginFailed(res.response.data);
        console.log(res.response.data);
      }
    });
    // localStorage.setItem("email", event.target.email.value);
    // localStorage.setItem("password", event.target.password.value);
    // window.location.href = "/products";
  };

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <IndexInput
        label="Username"
        type="text"
        placeholder="John Doe"
        name="username"
        ref={usernameRef}
      />
      <IndexInput
        label="Password"
        type="password"
        placeholder="********"
        name="password"
      />
      <Button type="submit" modify="bg-green-500 w-full">
        Login
      </Button>
      {loginFailed && (
        <p className="text-red-800 mt-3 text-center">{loginFailed}</p>
      )}
    </form>
  );
};

export default FormLogin;
