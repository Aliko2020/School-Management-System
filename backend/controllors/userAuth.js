const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const logger = require('../middleware/loggerMiddleware')

const registerStudent = async (req, res) => {
  const { user_name, password, role, student_id } = req.body;

  if (!(user_name && password && role && student_id)) {
    return res.status(400).json({
      message: 'Please provide username, password, role & student ID'
    });
  }

  if (role !== 'student') {
    return res.status(400).json({
      message: 'Registration is only allowed for the student role.'
    });
  }

  try {
    const existingStudentId = await pool.query(
      'SELECT student_id FROM users WHERE student_id = $1',
      [student_id]
    )
    if (existingStudentId.rows.length > 0) {
      return res.status(409).json({
        message: 'Student ID is already associated with an existing user'
      });
    }
    const existingStudent = await pool.query(
      'SELECT student_id FROM students WHERE student_id = $1',
      [student_id]
    )

    if (existingStudent.rows.length === 0) {
      return res.status(400).json({
        message: 'Invalid student ID. Student record not found.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      'INSERT INTO users (user_name, password, role, student_id, teacher_id) VALUES ($1, $2, $3, $4, NULL) RETURNING user_id, user_name, role, student_id',
      [user_name, hashedPassword, role, student_id]
    );

    const newUser = userResult.rows[0];

    // generate token
    const token = jwt.sign(
      {
        id: newUser.user_id,
        role: newUser.role,
        studentId: newUser.student_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(201).json({
      message: 'Student registered successfully', user: newUser, token: token
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong during student registration'
    })
  }
};

const registerTeacher = async (req, res) => {
  const { user_name, password, role, teacher_id } = req.body;

  if (!(user_name && password && role && teacher_id)) {
    return res.status(400).json({
      message: 'Please provide username, password, role & teacher ID'
    });
  }

  if (role !== 'teacher') {
    return res.status(400).json({
      message: 'Registration is only allowed for the teacher role.'
    });
  }

  try {
    const existingTeacherId = await pool.query(
      'SELECT teacher_id FROM users WHERE teacher_id = $1',
      [teacher_id]
    );

    if (existingTeacherId.rows.length > 0) {
      return res.status(409).json({
        message: 'Teacher ID is already associated with an existing user'
      });
    }

    const existingTeacher = await pool.query(
      'SELECT teacher_id FROM teachers WHERE teacher_id = $1',
      [teacher_id]
    );

    if (existingTeacher.rows.length === 0) {
      return res.status(400).json({
        message: 'Invalid teacher ID. Teacher record not found.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userResult = await pool.query(
      'INSERT INTO users (user_name, password, role, student_id, teacher_id) VALUES ($1, $2, $3, NULL, $4) RETURNING user_id, user_name, role, teacher_id',
      [user_name, hashedPassword, role, teacher_id]
    );

    const newUser = userResult.rows[0];

    //token for teacher
    const token = jwt.sign(
      {
        id: newUser.user_id,
        role: newUser.role,
        teacherid: newUser.teacher_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(201).json({
      message: 'Teacher registered successfully', user: newUser, token
    });

  } catch (error) {
    console.error('Error during teacher registration:', error);
    return res.status(500).json({
      message: 'Something went wrong during teacher registration'
    });
  }
};



const studentLogin = async (req, res) => {
  const { student_id, password } = req.body;

  if (!(student_id && password)) {
    return res.status(400).json({
      message: 'Please provide student ID and password'
    });
  }

  try {
    const userResult = await pool.query(
      'SELECT user_id, user_name, password, role, student_id FROM users WHERE student_id = $1',
      [student_id]

    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials,user not found'
      });
    }

    if (user.role !== 'student') {
      return res.status(403).json({
        message: 'Login is only allowed for student accounts.'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const { password: hashedPassword, ...userData } = user;

      const token = jwt.sign(
        {
          userid: userData.student_id,
          role: userData.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h'
        }
      )

      return res.status(200).json({
        message: 'Student login successful', user: userData, token
      });
    } else {

      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

  } catch (error) {
    console.error('Error during student login:', error);
    return res.status(500).json({
      message: 'Something went wrong during student login'
    });
  }
};

const teacherLogin = async (req, res) => {
  const { teacher_id, password } = req.body;

  if (!(teacher_id && password)) {
    return res.status(400).json({
      message: 'Please provide teacher ID and password'
    });
  }

  try {
    const userResult = await pool.query(
      'SELECT user_id, user_name, password, role, teacher_id FROM users WHERE teacher_id = $1',
      [teacher_id]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    if (user.role !== 'teacher') {
      return res.status(403).json({
        message: 'Login is only allowed for teacher accounts.'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const { password: hashedPassword, ...userData } = user;

      const token = jwt.sign(
        {
          userid: userData.user_id,
          role: userData.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h'
        }
      )
      return res.status(200).json({
        message: 'Teacher login successful', user: userData, token
      })
    } else {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

  } catch (error) {
    console.error('Error during teacher login:', error);
    return res.status(500).json({
      message: 'Something went wrong during teacher login'
    })
  }
};

//********************************************************************************************************************************* *//

const registerAdmin = async (req, res) => {
  const { name, email, password, secret } = req.body;
  console.log(secret);
  
  if (secret !== process.env.ADMIN_REGISTRATION_SECRET) {
    return res.status(403).json({ message: 'Unauthorized to register admin' });
  }

  if (!(name && email && password)) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  try {
    const existingAdmin = await pool.query('SELECT * FROM admin');

    if (existingAdmin.rows.length > 0) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO admin (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    

    const newAdmin = result.rows[0];

    const token = jwt.sign(
      {
        id: newAdmin.id,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: 'Admin registered successfully',
      admin: newAdmin,
      token
    });

  } catch (error) {
    console.error('Error during admin registration:', error);
    return res.status(500).json({ message: 'Something went wrong during admin registration' });
  }
};


const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({
      message: 'Please provide email and password'
    });
  }

  try {
    const result = await pool.query(
      'SELECT id, name, email, password, role FROM admin WHERE email = $1',
      [email]
    );

    const admin = result.rows[0];

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        role: admin.role || 'admin'
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    return res.status(200).json({
      message: 'Admin login successful',
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
      token
    });

  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({
      message: 'Something went wrong during admin login'
    });
  }
};


module.exports = {
  registerStudent,
  studentLogin,
  registerTeacher,
  teacherLogin,
  registerAdmin,
  adminLogin
};