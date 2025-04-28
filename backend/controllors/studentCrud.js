const pool = require("../config/database");

// student by ID
const getStudent = async (req, res) => {
  const studentId = parseInt(req.params.id);

  if (isNaN(studentId)) {
    return res.status(400).json({ message: 'Invalid student ID format' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM students WHERE student_id = $1',
      [studentId]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching all students:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createStudent = async (req, res) => {
  const { first_name, last_name, date_of_birth, gender, address, contact_number, email, enrollment_date, student_class } = req.body;

  try {
    // first, last name and DOB already exists ?
    const existingStudent = await pool.query(
      'SELECT * FROM students WHERE first_name = $1 AND last_name = $2 AND date_of_birth = $3',
      [first_name, last_name, date_of_birth]
    );

    if (existingStudent.rows.length > 0) {
      return res.status(409).json({ message: 'Student with this name and date of birth already exists' });
    }

    const result = await pool.query(
      'INSERT INTO students (first_name, last_name, date_of_birth, gender, address, contact_number, email, enrollment_date, student_class) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [first_name, last_name, date_of_birth, gender, address, contact_number, email, enrollment_date, student_class]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// update 
const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { first_name, last_name, date_of_birth, gender, address, contact_number, email, enrollment_date, student_class } = req.body;

  try {
    const result = await pool.query(
      'UPDATE students SET first_name = $1, last_name = $2, date_of_birth = $3, gender = $4, address = $5, contact_number = $6, email = $7, enrollment_date = $8, student_class = $9 WHERE student_id = $10 RETURNING *',
      [first_name, last_name, date_of_birth, gender, address, contact_number, email, enrollment_date, student_class, studentId]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const result = await pool.query(
      'DELETE FROM students WHERE student_id = $1 RETURNING *',
      [studentId]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: `Student with ID ${studentId} deleted successfully` });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getStudent,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};