import React from "react";
import FormRegister from "../component/Fragments/FormRegister";
import AuthLayout from "../component/Layouts/AuthLayout";

const RegisterPage = () => {
  return (
    <AuthLayout title="Register" type="register">
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterPage;
