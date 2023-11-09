import React from "react";
import AuthLayout from "../component/Layouts/AuthLayout";
import FormLogin from "./../component/Fragments/FormLogin";

const LoginPage = () => {
  return (
    <AuthLayout title="Login" type="login">
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginPage;
