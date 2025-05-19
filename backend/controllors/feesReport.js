const pool = require('../config/database');


const getFeeReport = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const ofset = (page - 1) * limit

    try {
        const records_in_db = await pool.query('SELECT COUNT(*) FROM fees')
        const total_records = parseInt(records_in_db.rows[0].count)

        const fees = await pool.query('SELECT * FROM fees LIMIT $1 OFFSET $2', [limit, ofset])

        if (fees.rows.length < 0) {
            return res.status(404).json({ message: 'No records found' });
        }
        res.status(200).json({
            page: page,
            limit: limit,
            total_records,
            total_pages: Math.ceil(total_records / limit),
            data: fees.rows
        })

    } catch (error) {
        console.error('Error fetching all fees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getFeeByStudentId = async (req, res) => {
    const studentId = req.params.id;
    
    if (isNaN(studentId)) {
        return res.status(400).json({ invalid: 'No or invalid student id' });
    }
    try {
        const result = await pool.query('SELECT * FROM fees WHERE student_id = $1', [studentId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No fee record found for the given student ID' });
        }

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching student fee:', error);
        res.status(500).json({ message: 'An error occurred while fetching student fee' });
    }
};

module.exports = {
    getFeeReport,
    getFeeByStudentId,
};
