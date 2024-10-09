import bcrypt from "bcryptjs";

const users = [
  {
    name: "Lucifer",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Tarun Kumar",
    email: "tarunlkr6@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Prem Jana",
    email: "prem@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
