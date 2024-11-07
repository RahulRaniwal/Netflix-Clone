import axios from 'axios';
import toast from 'react-hot-toast'
import {create} from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isAuthenticated: true,
  isLoggedOut: false,
  isLoggedIn: false,
  signup: async (credentials) =>{
    set({isSigningUp: true})
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({user: response.data.user, isSigningUp: false});
      toast.success('Account created succesfully');
    } catch (error) {
      const errorMessage = error.response.data.message || `An error occured`;
      toast.error(errorMessage);
      set({isSigningUp: false , user: null});
    }
  },
  login: async(credentials) =>{
    set({isLoggedIn: true});
    try {
      const response = await axios.post('/api/v1/auth/login' , credentials);
      set({user: response.data.user , isLoggedIn: false});
      toast.success('User logged in successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || `An error occured`;
      set({user: null , isLoggedIn: false})
      toast.error(errorMessage);
      
    }
  },
  logout: async () =>{
    try {
      await axios.post('/api/v1/auth/logout');
      set({user: null , isLoggedOut: false});
      toast.success('User logged out successfully');
    } catch (error) {
      set({isLoggedOut: false});
      toast.error(error.response.data.message || 'An error occurred');
    }
  },
  authCheck: async () =>{
    set({isAuthenticated: true});
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
        set({user: response.data.user , isAuthenticated: false});
    } catch (error) {
      set({isAuthenticated: false , user: null});
      // toast.error(error.response.data.message || 'An errorr');
    }
  },
}));