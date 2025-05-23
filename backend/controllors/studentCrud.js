const pool = require("../config/database");


const getStudent = async (req, res) => {
  const studentId = parseInt(req.params.id);

  if (isNaN(studentId)) {
    return res.status(400).json({ message: 'Invalid student ID format' });
  }

  if (req.user.role === 'student' && req.user.userid !== studentId) {
    return res.status(403).json({ message: 'Access denied: you can only view your own profile' });
  }

  try {
    const result = await pool.query(
      `SELECT 
        s.student_id,
        s.first_name AS student_first_name,
        s.last_name AS student_last_name,
        s.date_of_birth,
        s.gender,
        s.address,
        s.enrollment_date,
        c.class_name,
        f.amount AS fee_amount,
        f.payment_status,
        f.payment_date,
        p.first_name AS parent_first_name,
        p.last_name AS parent_last_name,
        p.contact_number AS parent_contact,
        p.email AS parent_email
      FROM 
        students s
      LEFT JOIN class c ON s.student_class = c.class_id
      LEFT JOIN fees f ON s.student_id = f.student_id
      LEFT JOIN parents p ON s.student_id = p.student_id
      WHERE 
        s.student_id = $1`,
      [studentId]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.error('Error retrieving student:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getAllStudents = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit

  try {
    const total_records = await pool.query('SELECT COUNT(*) FROM students')
    const total_students = total_records.rows[0].count

    const result = await pool.query('SELECT s.student_id,s.first_name,s.last_name,s.date_of_birth,s.gender,c.class_name FROM students s JOIN class c ON s.student_class = c.class_id LIMIT $1 OFFSET $2', [limit, offset]);

    const genderRecords = await pool.query(`
      SELECT 
        COUNT(*) FILTER (WHERE gender = 'male') AS male_count,
        COUNT(*) FILTER (WHERE gender = 'female') AS female_count,
        COUNT(*) AS total
      FROM students
    `);
    const genderDetails = genderRecords.rows[0]

    res.status(200).json({
      page,
      limit,
      total_students,
      total_pages: Math.ceil(total_students / limit),
      genderDetails,
      data: result.rows
    })

  } catch (err) {
    console.error('Error fetching all students:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//filter 
const filterStudent = async (req, res) => {
  const { first_name, last_name } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({
      title: 'Invalid input',
      message: 'First name and last name are required',
    });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM students WHERE first_name ILIKE $1 AND last_name ILIKE $2',
      [first_name, last_name]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ title: 'Something went wrong', message: error.message });
  }
};





const createStudent = async (req, res) => {
  const { first_name, last_name, date_of_birth, gender, address, contact_number, email, enrollment_date, student_class } = req.body;

  try {
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
  filterStudent,
  createStudent,
  updateStudent,
  deleteStudent
};