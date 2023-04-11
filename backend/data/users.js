import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Yazan Ali',
    email: 'yazan@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Mohammad Ali',
    email: 'mohammad@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
