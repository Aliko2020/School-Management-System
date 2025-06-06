import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { isTokenValid } from '../../utils/auth';
const token = localStorage.getItem('userToken');
const user = localStorage.getItem('userInfo');
const tokenIsValid = token && isTokenValid(token);




export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ id, email, password, role }, { rejectWithValue }) => {
        let API_URL
        let payload

        switch (role) {
            case 'student':
                API_URL = 'http://localhost:3000/api/users/loginStudent'
                payload = { student_id: id, password }
                break
            case 'teacher':
                API_URL = 'http://localhost:3000/api/users/loginTeacher'
                payload = { teacher_id: id, password }
                break
            case 'admin':
                API_URL = 'http://localhost:3000/api/users/admin/login'
                payload = { email, password }
                break
            default:
                return rejectWithValue('Invalid role selected')
        }

        try {
            const response = await axios.post(API_URL, payload)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)


const initialState = {
    loading: false,
    userInfo: tokenIsValid && user ? JSON.parse(user) : null,
    userToken: tokenIsValid ? token : null,
    error: null,
    success: tokenIsValid,
  };
  
  if (!tokenIsValid) {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
  }
  
  
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
            state.success = false
            localStorage.removeItem('userInfo')
            localStorage.removeItem('userToken')
        }        
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.userInfo = action.payload.user
                state.userToken = action.payload.token
                state.success = true

                localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
                localStorage.setItem('userToken', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload

                localStorage.removeItem('userInfo');
                localStorage.removeItem('userToken');

                
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
