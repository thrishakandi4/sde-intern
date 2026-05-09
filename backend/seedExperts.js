const dotenv = require('dotenv');

const connectDB = require('./config/db');
const Expert = require('./models/Expert');

dotenv.config();

const experts = [
  {
    name: 'Shivani',
    category: 'Frontend Development',
    experience: 5,
    rating: 4.8,
    bio: 'Helps students build polished user interfaces and strong portfolio projects.',
    profileImage: '',
    availableSlots: [
      { date: '2026-05-10', slots: ['10:00 AM', '11:00 AM', '2:00 PM'] },
      { date: '2026-05-11', slots: ['9:00 AM', '1:00 PM'] },
    ],
  },
  {
    name: 'Priyadharshini',
    category: 'UI/UX Design',
    experience: 3,
    rating: 4.5,
    bio: 'Design mentor for clean interfaces, user flows, and product thinking.',
    profileImage: '',
    availableSlots: [
      { date: '2026-05-10', slots: ['8:00 AM', '6:00 PM'] },
      { date: '2026-05-12', slots: ['9:00 AM', '5:00 PM'] },
    ],
  },
  {
    name: 'Thrisha kandi',
    category: 'Backend Development',
    experience: 6,
    rating: 4.9,
    bio: 'Senior developer guiding students in APIs, databases, and server architecture.',
    profileImage: '',
    availableSlots: [
      { date: '2026-05-10', slots: ['11:00 AM', '3:00 PM'] },
      { date: '2026-05-11', slots: ['10:00 AM', '4:00 PM'] },
    ],
  },
  {
    name: 'Archana',
    category: 'Product Management',
    experience: 4,
    rating: 4.7,
    bio: 'Helps teams prioritize features, define roadmaps, and ship better products.',
    profileImage: '',
    availableSlots: [
      { date: '2026-05-10', slots: ['9:30 AM', '1:30 PM'] },
      { date: '2026-05-12', slots: ['10:30 AM', '3:30 PM'] },
    ],
  },
  {
    name: 'Nithisha',
    category: 'DevOps',
    experience: 7,
    rating: 4.6,
    bio: 'Helps teams automate deployments, CI/CD, and cloud operations.',
    profileImage: '',
    availableSlots: [
      { date: '2026-05-11', slots: ['9:00 AM', '12:00 PM', '4:00 PM'] },
      { date: '2026-05-12', slots: ['10:00 AM', '2:00 PM'] },
    ],
  },
  {
    name: 'AbhiShesh',
    category: 'Data Science',
    experience: 5,
    rating: 4.8,
    bio: 'Supports learners with analytics, machine learning, and data storytelling.',
    profileImage: '',
    availableSlots: [
      { date: '2026-05-10', slots: ['9:00 AM', '12:30 PM'] },
      { date: '2026-05-12', slots: ['2:00 PM', '5:00 PM'] },
    ],
  },
  {
    name: 'Soujanya',
    category: 'Mobile Development',
    experience: 4,
    rating: 4.6,
    bio: 'Guides app development for Android, iOS, and cross-platform projects.',
    profileImage: '',
    availableSlots: [
      { date: '2026-05-11', slots: ['10:00 AM', '1:00 PM'] },
      { date: '2026-05-12', slots: ['11:00 AM', '4:00 PM'] },
    ],
  },
  {
    name: 'Nishidha',
    category: 'Cybersecurity',
    experience: 8,
    rating: 4.9,
    bio: 'Teaches secure coding, threat detection, and application hardening.',
    profileImage: '',
    availableSlots: [
      { date: '2026-05-10', slots: ['11:30 AM', '4:30 PM'] },
      { date: '2026-05-11', slots: ['9:30 AM', '2:30 PM'] },
    ],
  },
];

const seedExperts = async () => {
  try {
    await connectDB();

    await Expert.deleteMany({});
    await Expert.insertMany(experts);

    console.log(`Seeded ${experts.length} experts successfully.`);
    process.exit(0);
  } catch (error) {
    console.error(`Expert seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedExperts();