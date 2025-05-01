const pool = require('../config/database');

const createAnnouncement = async (req, res) => {
  const { title, content, class_id } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO announcement (title, content, user_id, class_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *`,
      [title, content, req.user.userid, class_id || null]
    );

    res.status(201).json({ message: 'Announcement created successfully', announcement: result.rows[0] });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAllAnnouncements = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM announcement ORDER BY created_at DESC'
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const updateAnnouncement = async (req, res) => {
  const announcementId = parseInt(req.params.id);
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      `UPDATE announcement SET title = $1, content = $2, updated_at = NOW() WHERE announcement_id = $3 RETURNING *`,
      [title, content, announcementId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ message: 'Announcement updated', announcement: result.rows[0] });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete announcement (admin only)
const deleteAnnouncement = async (req, res) => {
  const announcementId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `DELETE FROM announcement WHERE announcement_id = $1 RETURNING *`,
      [announcementId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement
};
