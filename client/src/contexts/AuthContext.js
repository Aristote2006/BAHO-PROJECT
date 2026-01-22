import React, { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  const initialState = {
    isAuthenticated: !!storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is still authenticated when component mounts
    if (storedToken && storedUser) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: storedToken,
          user: JSON.parse(storedUser)
        }
      });
    }
  }, [storedToken, storedUser]);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token: data.token,
            user: data.user
          }
        });

        return { success: true };
      } else {
        const error = data.message || 'Login failed';
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: error
        });
        return { success: false, message: error };
      }
    } catch (error) {
      const errorMessage = 'An error occurred during login';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      return { success: false, message: errorMessage };
    }
  };

  const register = async (firstName, lastName, email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token: data.token,
            user: data.user
          }
        });

        return { success: true };
      } else {
        const error = data.message || 'Registration failed';
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: error
        });
        return { success: false, message: error };
      }
    } catch (error) {
      const errorMessage = 'An error occurred during registration';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    dispatch({ type: 'LOGOUT' });
  };

  const updateUserProfile = async (profileData) => {
    try {
      // In a real app, this would make an API call to update the user
      // For now, we'll update the local state and localStorage
      const updatedUser = {
        ...state.user,
        ...profileData
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      dispatch({
        type: 'UPDATE_USER_PROFILE',
        payload: {
          user: updatedUser
        }
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;