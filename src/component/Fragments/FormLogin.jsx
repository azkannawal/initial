import Button from "../Elements/Button";
import IndexInput from "../Elements/Inputform";

const FormLogin = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("email", event.target.email.value);
    localStorage.setItem("password", event.target.password.value);
    window.location.href = "/products";
  };
  return (
    <form onSubmit={handleLogin}>
      <IndexInput
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
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
    </form>
  );
};

export default FormLogin;
