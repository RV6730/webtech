const Vote = require('../models/Vote');
const Candidate = require('../models/Candidate');
const Election = require('../models/Election');

// Submit a vote
exports.submitVote = async (req, res) => {
  try {
    const { electionId, candidateId } = req.body;
    const userId = req.user.id;

    // Check if election exists and is ongoing
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    const now = new Date();
    if (now < election.startDate) {
      return res.status(400).json({ message: 'Election has not started yet' });
    }
    if (now > election.endDate) {
      return res.status(400).json({ message: 'Election has ended' });
    }

    // Check if candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Check if user has already voted in this election
    const existingVote = await Vote.findOne({ user: userId, election: electionId });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted in this election' });
    }

    // Create vote
    const vote = new Vote({
      user: userId,
      election: electionId,
      candidate: candidateId
    });

    await vote.save();

    // Update candidate vote count
    candidate.voteCount += 1;
    await candidate.save();

    res.status(201).json({ message: 'Vote submitted successfully', vote });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already voted in this election' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's votes
exports.getUserVotes = async (req, res) => {
  try {
    const votes = await Vote.find({ user: req.user.id })
      .populate('election')
      .populate('candidate')
      .sort({ votedAt: -1 });
    
    res.json(votes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check if user has voted in a specific election
exports.checkVoteStatus = async (req, res) => {
  try {
    const { electionId } = req.params;
    const vote = await Vote.findOne({ 
      user: req.user.id, 
      election: electionId 
    });
    
    res.json({ hasVoted: !!vote, vote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get election results
exports.getElectionResults = async (req, res) => {
  try {
    const { electionId } = req.params;
    
    const votes = await Vote.find({ election: electionId })
      .populate('candidate');
    
    // Calculate results
    const results = {};
    votes.forEach(vote => {
      const candidateId = vote.candidate._id.toString();
      if (!results[candidateId]) {
        results[candidateId] = {
          candidate: vote.candidate,
          voteCount: 0
        };
      }
      results[candidateId].voteCount += 1;
    });
    
    const resultArray = Object.values(results).sort((a, b) => b.voteCount - a.voteCount);
    
    res.json({
      totalVotes: votes.length,
      results: resultArray
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
