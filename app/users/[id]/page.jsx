"use client";
import Banner from "@/components/banner";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { loadImage } from "@/services/authServices";

const User = () => {
  const [user, setUser] = useState({});
  const [profileImg, setProfileImg] = useState();
  // const loadImage = async ()=>{
  //   const img = await axios.get("http://localhost:4000/uploads/file-1710756701942.jpeg", { responseType: 'blob' })
  //           .then(response => {
  //               const objectURL = URL.createObjectURL(response.data);
  //               return (objectURL);
  //           })
  //           .catch(error => {
  //               console.error('There was a problem fetching the image:', error);
  //           });
  //           console.log(img);
  // }
  useEffect(() => {
    const currentUser = JSON.parse(Cookies.get("currentUser")).data;
    setUser(currentUser);
    loadImage(currentUser.profileImg).then((img) => {
      setProfileImg(img);
    });
  }, []);
  return (
    <div>
      <Banner title={user.username} />
      
      <div className="container">
        <div className="card mx-auto p-2" >
          <div className="row">
            <div className="col-md-4">
              <Image
                src={profileImg ? profileImg : "/userImg.png"}
                // src= "/userImg.png"
                // className="img-fluid rounded-start"
                className="rounded-circle overflow-hidden "
                width={300}
                height={300}
                alt="Picture of the author"
                />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Username: {user.username}</h5>
                <p className="card-text">
                 Email: {user.email}
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                   Role: {user.isAdmin? "Admin" : "User"}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
                </div>
                </div>
  );
};

export default User;
