import bcrypt from "bcryptjs";

const users = [
  {
    name: "Lucifer",
    email: "admin@example.com",
    password: bcrypt.hashSync("lucifer1", 12),
    isAdmin: true,
  },
  {
    name: "Tarun Kumar",
    email: "tarunlkr6@gmail.com",
    password: bcrypt.hashSync("12345", 12),
  },
  {
    name: "Tony Stark",
    email: "tony@gmail.com",
    password: bcrypt.hashSync("12345", 12),
  },
];

export default users;
