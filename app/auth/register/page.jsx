"use client";
import Banner from "@/components/banner";
import InputField from "@/components/form/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "@/services/authServices";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import PasswordField from "@/components/form/passwordInput";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    email: yup.string().email("Invalid email address").required(),
    password: yup.string().required(),
  })
  .required();

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const postUser = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("username", data.username);
    formData.append("isAdmin", data.isAdmin);
    formData.append("email", data.email);
    formData.append("password", data.password);
   
    
    await registerUser(formData).then((res) => {
      console.log(res);
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false);
        router.push("/");
      }, 2000);
    }).catch((error)=>{
      console.log("hi");
    });
  };
  const onSubmit = (data, event) => {
    event.preventDefault();
    // console.log(data);
    postUser(data);
  };
  return (
    <>
      <Banner title="Register" />
      {success && (
            <div className="alert alert-success " role="alert">
              Logged In Successfuly!
            </div>
          )}
      <div className="container-md">
        <div className="wrapper p-4">
          <div className="row">
            <div className="col"></div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <InputField
                    type="text"
                    label="Username"
                    name="username"
                    register={register}
                  />
                </div>
                <div>
                  <InputField
                    type="text"
                    label="Email"
                    name="email"
                    register={register}
                  />
                </div>
                <div>
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
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                    <label className="form-label" for="customFile">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="customFile"
                      {...register("file")}
                    />
                  </div>
                  <label className="form-label">Is Admin</label>
                  <select className="form-select" {...register("isAdmin")}>
                    <option value="">Choose Option</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
                <div class="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
