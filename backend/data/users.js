import bcrypt from 'bcryptjs'


const users = [
{
    name: 'Admin User',
    email: 'admin@elfak.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: true
},

{
    name: 'David Azdejkovic',
    email: 'david@elfak.com',
    password: bcrypt.hashSync('123456',10),
   
},


{
    name: 'Tijana Stankovic',
    email: 'tijana@elfak.com',
    password: bcrypt.hashSync('123456',10),
   
},


]


export default users