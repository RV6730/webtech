const Election = require('../models/Election');

// Get all elections
exports.getAllElections = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (category && category !== 'all') filter.category = category;
    
    const elections = await Election.find(filter)
      .populate('candidates')
      .sort({ startDate: -1 });
    
    res.json(elections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get election by ID
exports.getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id).populate('candidates');
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.json(election);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new election
exports.createElection = async (req, res) => {
  try {
    const { title, description, category, startDate, endDate, candidates } = req.body;
    
    const election = new Election({
      title,
      description,
      category,
      startDate,
      endDate,
      candidates
    });
    
    await election.save();
    res.status(201).json({ message: 'Election created successfully', election });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update election
exports.updateElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    
    res.json({ message: 'Election updated successfully', election });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete election
exports.deleteElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndDelete(req.params.id);
    
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    
    res.json({ message: 'Election deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
