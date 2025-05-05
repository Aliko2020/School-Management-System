const pool = require('../config/database');


const getParents = async (req, res) => {
    try {
        const parents = await pool.query('SELECT * FROM parents');
        res.status(200).json(parents.rows);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const getParentById = async (req, res) => {

    const studentId = req.params.id;

    if (!studentId) {
        return res.status(400).json({ message: "Please provide student ID" });
    }

    try {
        const parent = await pool.query('SELECT * FROM parents WHERE student_id = $1', [studentId]);

        if (parent.rows.length === 0) {
            return res.status(404).json({ message: "Parent not found for the given student ID" });
        }

        res.status(200).json(parent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};


const addParent = async (req, res) => {
    const { first_name, last_name, contact_number, email } = req.body;

    
    const student_id = req.user?.userid;
    console.log(student_id);
    

    if (!student_id) {
        return res.status(403).json({ message: "Unauthorized: student ID not found" });
    }

    if (!first_name || !last_name || !contact_number || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existing = await pool.query(
            'SELECT * FROM parents WHERE student_id = $1',
            [student_id]
        );
        if (existing.rows.length > 0) {
            return res.status(409).json({ message: "A parent record already exists for this student." });
        }

        const newParent = await pool.query(
            `INSERT INTO parents (first_name, last_name, contact_number, email, student_id)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [first_name, last_name, contact_number, email, student_id]
        );

        res.status(201).json(newParent.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to add parent", error });
    }
};



const deleteParent = async (req, res) => {
    const studentId = req.params.id;

    try {
        const parent = await pool.query('DELETE FROM parents WHERE student_id = $1 RETURNING *', [studentId]);

        res.status(200).json({ message: "Parent deleted successfully", deleted: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete parent", error });
    }
};

module.exports = {
    addParent,
    getParents,
    getParentById,
    deleteParent
};
