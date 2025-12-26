require('dotenv').config();
const mongoose = require('mongoose');
const Candidate = require('./backend/models/Candidate');
const Election = require('./backend/models/Election');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/amity_student_portal';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Candidate.deleteMany({});
    await Election.deleteMany({});
    console.log('Cleared existing data');

    // Create sample candidates
    const candidates = [
      // GDG Candidates
      {
        name: 'Rajesh Kumar',
        position: 'President',
        category: 'gdg',
        image: '1.jpg',
        description: 'Passionate about Google technologies and community building',
        manifesto: 'Will organize monthly workshops and hackathons to enhance technical skills',
        voteCount: 0
      },
      {
        name: 'Priya Sharma',
        position: 'Vice President',
        category: 'gdg',
        image: '2.jpg',
        description: 'Experienced in event management and developer relations',
        manifesto: 'Focus on increasing GDG membership and industry collaborations',
        voteCount: 0
      },
      // Microsoft SAE Candidates
      {
        name: 'Amit Patel',
        position: 'President',
        category: 'microsoft',
        image: '3.jpg',
        description: 'Microsoft Azure certified professional',
        manifesto: 'Bring more Microsoft certifications opportunities to students',
        voteCount: 0
      },
      {
        name: 'Sneha Reddy',
        position: 'Secretary',
        category: 'microsoft',
        image: '4.jpg',
        description: 'Active contributor to Microsoft Student Partner program',
        manifesto: 'Organize weekly coding sessions on Microsoft technologies',
        voteCount: 0
      },
      // Amity College Candidates
      {
        name: 'Vikram Singh',
        position: 'President',
        category: 'amity',
        image: '5.jpg',
        description: 'Student Council member for 2 years',
        manifesto: 'Improve student facilities and organize cultural events',
        voteCount: 0
      },
      {
        name: 'Ananya Iyer',
        position: 'Vice President',
        category: 'amity',
        image: '6.jpg',
        description: 'Active in multiple student organizations',
        manifesto: 'Create more opportunities for student participation in college decisions',
        voteCount: 0
      },
      // IEEE Candidates
      {
        name: 'Karthik Menon',
        position: 'Chair',
        category: 'IEEE',
        image: '7.jpg',
        description: 'Published researcher in IEEE conferences',
        manifesto: 'Promote research culture and IEEE publications among students',
        voteCount: 0
      },
      {
        name: 'Divya Nair',
        position: 'Secretary',
        category: 'IEEE',
        image: '8.jpg',
        description: 'Coordinator for IEEE student branch',
        manifesto: 'Organize technical seminars and industry expert sessions',
        voteCount: 0
      }
    ];

    const createdCandidates = await Candidate.insertMany(candidates);
    console.log(`Created ${createdCandidates.length} candidates`);

    // Create sample elections
    const now = new Date();
    const elections = [
      {
        title: 'GDG Lead Elections 2025',
        description: 'Annual elections for Google Developer Group leadership positions',
        category: 'gdg',
        startDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        status: 'ongoing',
        candidates: createdCandidates.filter(c => c.category === 'gdg').map(c => c._id)
      },
      {
        title: 'Microsoft SAE Elections 2025',
        description: 'Elections for Microsoft Student Ambassador Executive positions',
        category: 'microsoft',
        startDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: 'upcoming',
        candidates: createdCandidates.filter(c => c.category === 'microsoft').map(c => c._id)
      },
      {
        title: 'Amity Student Council Elections 2025',
        description: 'General student council elections for the academic year',
        category: 'amity',
        startDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        status: 'ongoing',
        candidates: createdCandidates.filter(c => c.category === 'amity').map(c => c._id)
      },
      {
        title: 'IEEE Student Branch Elections 2025',
        description: 'Elections for IEEE student branch executive committee',
        category: 'IEEE',
        startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        endDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        status: 'completed',
        candidates: createdCandidates.filter(c => c.category === 'IEEE').map(c => c._id)
      }
    ];

    const createdElections = await Election.insertMany(elections);
    console.log(`Created ${createdElections.length} elections`);

    console.log('\n=== Seed data created successfully! ===');
    console.log(`Total Candidates: ${createdCandidates.length}`);
    console.log(`Total Elections: ${createdElections.length}`);
    console.log('\nElection Status:');
    console.log(`- Ongoing: ${elections.filter(e => e.status === 'ongoing').length}`);
    console.log(`- Upcoming: ${elections.filter(e => e.status === 'upcoming').length}`);
    console.log(`- Completed: ${elections.filter(e => e.status === 'completed').length}`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

// Run the seed script
connectDB().then(() => {
  seedData();
});
