import type { userType } from "../types/user.js";




export const users : userType[]= [
  {
    _id: "64f9b2c9e9b1a2d3f4c5d6e1",
    username: "sanctifier",
    email: "sanctifier@gmail.com",
    password: "123456",
    fullname: "Mensah Gabriel",
    role: "admin",
    isVerified: true,
    createdAt: "2025-08-28T21:00:00.000Z",
  },
  {
    _id: "64f9b2c9e9b1a2d3f4c5d6e2",
    username: "gabriel",
    email: "gabriel@gmail.com",
    password: "123456",
    fullname: "Gabriel Junior",
    role: "entrepreneur",
    isVerified: true,
    createdAt: "2025-08-28T21:05:00.000Z",
  },
  {
    _id: "64f9b2c9e9b1a2d3f4c5d6e3",
    username: "shinny",
    email: "shinny@gmail.com",
    password: "123456",
    fullname: "Shinny K.",
    role: "user",
    isVerified: false,
    createdAt: "2025-08-28T21:10:00.000Z",
  },
];
