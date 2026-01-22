import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  TextField,
  Alert
} from '@mui/material';
import { debugAuthFlow } from '../utils/debugUtils';

const DeploymentTestPage = () => {
  const [testResults, setTestResults] = useState([]);
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('test123');

  const runTests = async () => {
    setTestResults([]);
    
    try {
      // Run internal debug
      await debugAuthFlow();
      
      // Test actual login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const result = {
        timestamp: new Date().toISOString(),
        endpoint: '/api/auth/login',
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      };
      
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
        result.data = data;
      } else {
        const text = await response.text();
        result.text = text.substring(0, 200);
      }
      
      setTestResults([result]);
    } catch (error) {
      setTestResults([{
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: error.stack
      }]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Deployment Debug Test
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
          sx={{ mb: 3 }}
        >
          Run Debug Tests
        </Button>
        
        {testResults.map((result, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Test Result {index + 1} - {result.timestamp}
            </Typography>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </Box>
        ))}
        
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            Open browser developer tools (F12) to see detailed console logs. 
            Check the Network tab to monitor API requests.
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
};

export default DeploymentTestPage;