import Button from "../Elements/Button";
import IndexInput from "../Elements/Inputform";

const FormRegister = () => {
  return (
    <form action="">
      <IndexInput
        label="Fullname"
        type="text"
        placeholder="insert your name here.."
        name="fullname"
      />
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
      <IndexInput
        label="Confirm Password"
        type="password"
        placeholder="********"
        name="confirmPassword"
      />
      <Button modify="bg-green-500 w-full">Register</Button>
    </form>
  );
};

export default FormRegister;
