require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL );

    const users = [
      { name: 'Rahul' },
      { name: 'Kamal' },
      { name: 'Sanak' },
      { name: 'Aryan' },
      { name: 'Amit' },
      { name: 'Neha' },
      { name: 'Pooja' },
      { name: 'Ravi' },
      { name: 'Simran' },
      { name: 'Manish' },
    ];

    await User.deleteMany(); // optional: clear old users
    await User.insertMany(users);

    console.log('✅ Users seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding users:', err);
    process.exit(1);
  }
};

seedUsers();