import jwt from "jsonwebtoken";
import {encrypt, decrypt} from "./encrypt.js"; 

/*
    Utility to generate a token
    get user id as parameter
    JWT_SECRET is an environment variable in 
    .env file
    expire in 3 hours
*/
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
};

/*
    Utility to generate a login token
    get user id as parameter
    JWT_SECRET is an environment variable in 
    .env file
    expire in 90 days
*/
export const getLoginToken = (email, password) => {
  const dataPayload = { 
    email: encrypt(email), 
    password: encrypt(password), 
  };
   
  return jwt.sign(dataPayload, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
};
