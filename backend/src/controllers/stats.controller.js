import Task from "../models/Task.model.js";

// @desc    Get stats for current user
// @route   GET /api/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({ user: userId, status: "Completed" });
    const pendingTasks = await Task.countDocuments({ user: userId, status: "Pending" });
    const highPriorityTasks = await Task.countDocuments({ user: userId, priority: "High" });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      highPriorityTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
