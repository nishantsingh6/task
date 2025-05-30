const Organization = require('../models/Organization');
const User = require('../models/User');

 const {authenticate} = require('../middlewares/authMiddleware');

// Create a new organization and assign creator as admin
exports.createOrganization = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; // from auth middleware
    if (!name) {
      return res.status(400).json({ success: false, message: 'Organization name is required' });
    }

    // Create organization with creator as admin
    const org = new Organization({
      name,
      createdBy: userId,
      users: [{ userId, role: 'admin' }],
    });

    await org.save();

    // Optionally, add this organization to the user's organizations array
    await User.findByIdAndUpdate(userId, { $push: { organizations: org._id } });

    res.status(201).json({ success: true, organization: org });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get organizations where user belongs
exports.getUserOrganizations = async (req, res) => {
  try {
    const userId = req.user.id;

    const organizations = await Organization.find({ 'users.userId': userId });

    res.json({ success: true, organizations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Add a user to an organization with role (admin/manager/member)
exports.addUserToOrganization = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { userId, role } = req.body;

    // Validate role
    if (!['admin', 'manager', 'member'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    // Check if org exists
    const org = await Organization.findById(orgId);
    if (!org) {
      return res.status(404).json({ success: false, message: 'Organization not found' });
    }

    // Check if user already in org
    if (org.users.some(u => u.userId.toString() === userId)) {
      return res.status(400).json({ success: false, message: 'User already in organization' });
    }

    org.users.push({ userId, role });
    await org.save();

    // Add org to user's organizations array
    await User.findByIdAndUpdate(userId, { $push: { organizations: orgId } });

    res.json({ success: true, organization: org });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
