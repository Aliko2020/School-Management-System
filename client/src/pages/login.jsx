import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
  const dispatch = useDispatch()
  const { loading, error, success, userInfo } = useSelector((state) => state.auth)

  const [role, setRole] = useState('student')
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  // Toast Notifications

  useEffect(() => {
    if (success && userInfo) {
      toast.success(`Login successful as ${userInfo.role}`)
    }

    if (error) {
      toast.error('Invalid credentials')
    }
  }, [success, error, userInfo])

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'admin') navigate('/admin/home')
      else if (userInfo.role === 'teacher') navigate('/teacher/home')
      else navigate('/student/home')
    }
  }, [userInfo, navigate])

  const handleInputs = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      loginUser({
        id: formData.id,
        email: formData.email,
        password: formData.password,
        role,
      })
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <form className="max-w-sm w-full p-6" onSubmit={handleSubmit}>
        <div className="mb-6 text-white">
          <div className="flex justify-around">
            {['student', 'teacher', 'admin'].map((r) => (
              <label key={r} className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-blue-600"
                />
                <span className="capitalize">{r}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder={
            role === 'admin' ? 'Email' : role === 'student' ? 'Student ID' : 'Teacher ID'
          }
          className="w-full rounded-full text-center mb-6 px-6 py-4 border focus:outline-none focus:ring-2 focus:ring-secondary"
          name={role === 'admin' ? 'email' : 'id'}
          onChange={handleInputs}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-full text-center mb-6 px-6 py-4 border focus:outline-none focus:ring-2 focus:ring-secondary"
          name="password"
          onChange={handleInputs}
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-secondary hover:bg-secondary2 px-16 py-3 mb-6 rounded-full text-white font-bold"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <p className="text-center mb-4 text-white cursor-pointer hover:underline">
          Forgot password?
        </p>
        <p className="text-center text-white">
          Don’t have an account yet?{' '}
          <Link to="/register" className="font-bold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
