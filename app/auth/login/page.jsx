"use client";
import Banner from "@/components/banner";
import InputField from "@/components/form/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "@/services/authServices";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

import PasswordField from "@/components/form/passwordInput";
import { Router } from "next/router";

const schema = yup
  .object({
    email: yup.string().email("Invalid email address").required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const userLogin = async (data) => {
      try {
        const res = await loginUser(data)
        console.log(res);
        Cookies.set("currentUser", JSON.stringify(res));
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push("/");
          Router.refresh();

        }, 2000);

      } catch (error) {
        setFailed(true)
        console.log(error);
      }  
    
  
    
  };
  const onSubmit = (data, event) => {
    event.preventDefault();
    setFailed(false)
    userLogin(data);
  };
  return (
    <>
      <Banner title="Login" />
      <div className="container-md">
        <div className="wrapper p-4">
          {success && (
            <div className="alert alert-success " role="alert">
              Logged In Successfuly!
            </div>
          )}
          {failed && (
            <div className="alert alert-danger " role="alert">
              Incorrect Email or Password!
            </div>
          )}
          <div className="row">
            <div className="col"></div>
            <div className="col-md-6">
              <div className="card p-md-5 p-3 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  type="text"
                  label="Email"
                  name="email"
                  register={register}
                />
                <p>{errors.email?.message}</p>
                <PasswordField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  register={register}
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  onShowPassword={() => {
                    setShowPassword(!showPassword);
                  }}
                />
                <p>{errors.password?.message}</p>

                <div className="d-grid gap-2 mb-3">
                  <button className="btn btn-primary" type="submit">
                    Log In
                  </button>
                </div>
              </form>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
