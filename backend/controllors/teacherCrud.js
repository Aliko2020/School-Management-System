const pool = require("../config/database")


const createTeacher = async (req,res)=>{
    
}

const getTeachers = async (req,res)=>{
    try {
        const teachers = await pool.query('SELECT * FROM teachers');
        res.status(200).json(teachers.rows)
    } catch (error) {
        console.error('Error fetching all teachers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTeacherbyid = async (req,res)=>{
    const teacherId = req.params.id;

    if(!teacherId){
       return res.json({message: "No or invalid id provided"})
    }
    try {
        const teacher = await pool.query('SELECT * FROM teachers WHERE teacher_id = $1',[teacherId])
        if (teacher.rows.length > 0) {
            res.status(200).json(teacher.rows[0]);
          } else {
            res.status(404).json({ message: 'teacher not found' });
          }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' },error);
    }
};

const deleteTeacher = async (req,res)=>{
  const teacherid = req.params.id;
  
  try {
    const teacher = await pool.query(
      'DELETE FROM teachers WHERE teacher_id = $1 RETURNING *',
      [teacherid]
    )

    if (teacher.rows.length > 0) {
      res.status(200).json({ message: `Teacher with ID ${teacherid} deleted successfully` });
    } else {
      res.status(404).json({ message: 'teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    createTeacher,
    getTeachers,
    getTeacherbyid,
    deleteTeacher
}