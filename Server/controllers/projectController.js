const Project = require('../models/Project');
const Organization = require('../models/Organization');


exports.createProject = async (req, res) => {
  const { title, description, organizationId, members } = req.body;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const userRoleEntry = organization.users.find(
      (u) => u.userId.toString() === req.user.id
    );
    if (!userRoleEntry || !['admin', 'manager'].includes(userRoleEntry.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient role' });
    }

    if (members && members.length > 0) {
      const orgUserIds = organization.users.map((u) => u.userId.toString());
      const invalidMembers = members.filter((m) => !orgUserIds.includes(m));
      if (invalidMembers.length > 0) {
        return res.status(400).json({
          message: 'Some members are not part of the organization',
          invalidMembers,
        });
      }
    }

    const project = await Project.create({
      title,
      description,
      organization: organizationId,
      members: members || [],
    });

    return res.status(201).json({ project });
  } catch (error) {
    console.error('Create Project Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.getProjects = async (req, res) => {
  try {
    const { orgId } = req.params;
    const organization = await Organization.findById(orgId);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const isMember = organization.users.some((u) => u.userId.toString() === req.user.id);
    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const projects = await Project.find({ organization: orgId })
      .populate('members', 'name email role');

    return res.json({ projects });
  } catch (error) {
    console.error('Get Projects Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate('members', 'name email role')
      .populate({
        path: 'tasks',
        populate: [
          { path: 'assignedTo', model: 'User', select: 'name email' },
          { path: 'comments', model: 'Comment' },
        ],
      });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isMember = project.members.some((m) => m._id.toString() === req.user.id);
    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.json({ project });
  } catch (error) {
    console.error('Get Project Details Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, members } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const organization = await Organization.findById(project.organization);
    const userRoleEntry = organization.users.find(
      (u) => u.userId.toString() === req.user.id
    );
    if (!userRoleEntry || !['admin', 'manager'].includes(userRoleEntry.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient role' });
    }

    // Validate members (must belong to org)
    if (members && members.length > 0) {
      const orgUserIds = organization.users.map((u) => u.userId.toString());
      const invalidMembers = members.filter((m) => !orgUserIds.includes(m));
      if (invalidMembers.length > 0) {
        return res.status(400).json({
          message: 'Some members are not part of the organization',
          invalidMembers,
        });
      }
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (members) project.members = members;

    await project.save();

    return res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Update Project Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const organization = await Organization.findById(project.organization);
    const userRoleEntry = organization.users.find(
      (u) => u.userId.toString() === req.user.id
    );
    if (!userRoleEntry || !['admin', 'manager'].includes(userRoleEntry.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient role' });
    }

    await project.deleteOne();

    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete Project Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
