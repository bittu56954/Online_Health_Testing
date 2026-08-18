import ScanHistory from '../models/ScanHistory.js';

// @desc    Get Scan History for Logged in User
// @route   GET /api/history
// @access  Private
export const getScanHistory = async (req, res) => {
  try {
    const history = await ScanHistory.find({ user: req.user._id }).sort({ scanDate: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete Single History Item
// @route   DELETE /api/history/:id
// @access  Private
export const deleteHistoryItem = async (req, res) => {
  try {
    const item = await ScanHistory.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Scan history entry not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Scan history entry deleted.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Clear All History for User
// @route   DELETE /api/history/clear-all
// @access  Private
export const clearHistory = async (req, res) => {
  try {
    await ScanHistory.deleteMany({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: 'All scan history entries cleared.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
