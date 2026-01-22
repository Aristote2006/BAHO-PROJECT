import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  TextField,
  Alert,
  CircularProgress
} from '@mui/material';

const DeploymentTestPage = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('test123');

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);
    
    const results = [];
    
    try {
      // Test 1: Check API base URL
      const apiUrl = process.env.REACT_APP_API_URL || '/api';
      results.push({
        test: 'API Base URL Configuration',
        status: 'info',
        message: `Using API URL: ${apiUrl}`
      });
      
      // Test 2: Test direct API connection
      try {
        const healthResponse = await fetch(`${apiUrl.replace('/api', '')}/health`);
        results.push({
          test: 'Health Check Endpoint',
          status: healthResponse.ok ? 'success' : 'error',
          message: `Status: ${healthResponse.status} ${healthResponse.statusText}`,
          data: await healthResponse.json()
        });
      } catch (error) {
        results.push({
          test: 'Health Check Endpoint',
          status: 'error',
          message: `Connection failed: ${error.message}`
        });
      }
      
      // Test 3: Test login endpoint accessibility
      try {
        const loginResponse = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        results.push({
          test: 'Login Endpoint Accessibility',
          status: loginResponse.ok ? 'success' : 'warning',
          message: `Status: ${loginResponse.status} ${loginResponse.statusText}`,
          headers: Object.fromEntries(loginResponse.headers.entries())
        });
        
        // Try to parse response
        const contentType = loginResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const loginData = await loginResponse.json();
          results.push({
            test: 'Login Response Parsing',
            status: 'success',
            message: 'Successfully parsed JSON response',
            data: loginData
          });
        } else {
          const text = await loginResponse.text();
          results.push({
            test: 'Login Response Parsing',
            status: 'warning',
            message: `Non-JSON response received`,
            data: text.substring(0, 200)
          });
        }
      } catch (error) {
        results.push({
          test: 'Login Endpoint Accessibility',
          status: 'error',
          message: `Request failed: ${error.message}`
        });
      }
      
    } catch (error) {
      results.push({
        test: 'Overall Test Execution',
        status: 'error',
        message: `Test suite failed: ${error.message}`
      });
    }
    
    setTestResults(results);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'success.main';
      case 'error': return 'error.main';
      case 'warning': return 'warning.main';
      default: return 'info.main';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Deployment Connection Test
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Test Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Test Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        
        <Button 
          variant="contained" 
          onClick={runTests}
          disabled={loading}
          sx={{ mb: 3 }}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Running Tests...' : 'Run Connection Tests'}
        </Button>
        
        {testResults.map((result, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, borderLeft: 3, borderColor: getStatusColor(result.status) }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: getStatusColor(result.status) }}>
              {result.test}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {result.message}
            </Typography>
            {result.data && (
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '4px',
                marginTop: '8px',
                fontSize: '12px',
                maxHeight: '200px',
                overflow: 'auto'
              }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </Box>
        ))}
        
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            This test checks the connection between your frontend and backend API. 
            Make sure your REACT_APP_API_URL environment variable is set correctly in your deployment.
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
};

export default DeploymentTestPage;