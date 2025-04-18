const bcrypt = require('bcrypt');
const pool = require('../config/database');

const registerUser = async (req, res) => {
  const { user_name, password, role, student_id} = req.body;

  if (!user_name || !password || !role || student_id === undefined) { 
    return res.status(400).json({ message: 'Please provide username, password, role & student ID' });
  }

  try {
    const existingStudentId = await pool.query(
      'SELECT student_id FROM users WHERE student_id = $1',
      [student_id]
    );

    if (existingStudentId.rows.length > 0) {
      return res.status(409).json({ message: 'Student ID is already associated with an existing user'});
    }

    // Verify if the student_id exists in the students table 
    const existingStudent = await pool.query(
      'SELECT student_id FROM students WHERE student_id = $1',
      [student_id]
    );

    if (existingStudent.rows.length === 0 && role === 'student') {
      return res.status(400).json({ message: 'Invalid student ID. Student record not found.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      'INSERT INTO users (user_name, password, role, student_id) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, role, student_id',
      [user_name, hashedPassword, role, student_id]
    );

    const newUser = userResult.rows[0];

    return res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Something went wrong during registration' });
  }
};


//Login logic
const userLogin = async (req, res) => {
    const { student_id, password } = req.body;
  
    if (!student_id || !password) {
      return res.status(400).json({ message: 'Please provide student ID and password' });
    }
  
    try {
      const userResult = await pool.query(
        'SELECT user_id, user_name, password, role, student_id FROM users WHERE student_id = $1',
        [student_id]
        
      );
  
      const user = userResult.rows[0];
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch);
      
      if (passwordMatch) {
        const { password: hashedPassword, ...userData } = user;
        return res.status(200).json({ message: 'Login successful', user: userData });
      } else {
        
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Something went wrong during login' });
    }
  };

module.exports = {
  registerUser,
  userLogin
};