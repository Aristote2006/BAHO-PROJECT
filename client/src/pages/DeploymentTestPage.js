import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  TextField,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      const currentApiUrl = process.env.REACT_APP_API_URL || '/api';
      results.push({
        test: 'Environment Configuration',
        status: 'info',
        message: `REACT_APP_API_URL: ${process.env.REACT_APP_API_URL || 'Not set'}`,
        details: {
          NODE_ENV: process.env.NODE_ENV || 'Not set',
          API_URL: currentApiUrl
        }
      });
      
      // Test 2: Test direct API connection
      try {
        const healthUrl = currentApiUrl.replace('/api', '') || '';
        const healthEndpoint = healthUrl ? `${healthUrl}/health` : '/health';
        
        const healthResponse = await fetch(healthEndpoint, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        
        results.push({
          test: 'Health Check Endpoint',
          status: healthResponse.ok ? 'success' : 'error',
          message: `Status: ${healthResponse.status} ${healthResponse.statusText}`,
          url: healthEndpoint
        });
        
        if (healthResponse.ok) {
          try {
            const healthData = await healthResponse.json();
            results.push({
              test: 'Health Check Data',
              status: 'success',
              message: 'Successfully parsed health check JSON',
              data: healthData
            });
          } catch (jsonError) {
            const text = await healthResponse.text();
            results.push({
              test: 'Health Check Data',
              status: 'error',
              message: `Failed to parse JSON: ${jsonError.message}`,
              rawResponse: text
            });
          }
        }
      } catch (error) {
        results.push({
          test: 'Health Check Endpoint',
          status: 'error',
          message: `Connection failed: ${error.message}`,
          details: error.stack
        });
      }
      
      // Test 3: Test auth endpoints
      try {
        // First test login endpoint accessibility
        const loginResponse = await fetch(`${currentApiUrl}/auth/login`, {
          method: 'OPTIONS', // Test with OPTIONS first to check if endpoint exists
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        results.push({
          test: 'Auth Endpoint Accessibility',
          status: loginResponse.status === 405 || loginResponse.status === 200 ? 'success' : 'error', // 405 is expected for OPTIONS
          message: `Login endpoint status: ${loginResponse.status} (expected 405 or 200 for accessibility)`,
          url: `${currentApiUrl}/auth/login`
        });
      } catch (error) {
        results.push({
          test: 'Auth Endpoint Accessibility',
          status: 'error',
          message: `Auth endpoint test failed: ${error.message}`
        });
      }
      
      // Test 4: Test login with credentials (without expecting success)
      try {
        const loginResponse = await fetch(`${currentApiUrl}/auth/login`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        results.push({
          test: 'Login Endpoint Response',
          status: loginResponse.status !== 404 ? 'info' : 'error',
          message: `Login response status: ${loginResponse.status}`,
          headers: Object.fromEntries(loginResponse.headers.entries())
        });
        
        // Try to parse response regardless of status
        const contentType = loginResponse.headers.get('content-type');
        try {
          if (contentType && contentType.includes('application/json')) {
            const loginData = await loginResponse.json();
            results.push({
              test: 'Login Response Parsing',
              status: 'success',
              message: 'Successfully parsed JSON response',
              data: loginData,
              statusText: loginResponse.statusText
            });
          } else {
            const text = await loginResponse.text();
            results.push({
              test: 'Login Response Parsing',
              status: loginResponse.status === 404 ? 'error' : 'warning',
              message: `Non-JSON response received: ${text.substring(0, 200)}`,
              rawResponse: text
            });
          }
        } catch (parseError) {
          const text = await loginResponse.text();
          results.push({
            test: 'Login Response Parsing',
            status: 'error',
            message: `Failed to parse response: ${parseError.message}`,
            rawResponse: text
          });
        }
      } catch (error) {
        results.push({
          test: 'Login Endpoint Request',
          status: 'error',
          message: `Login request failed: ${error.message}`,
          details: error.stack
        });
      }
      
    } catch (error) {
      results.push({
        test: 'Overall Test Execution',
        status: 'error',
        message: `Test suite failed: ${error.message}`,
        details: error.stack
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
      case 'info': return 'info.main';
      default: return 'grey.600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '❓';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          🛠️ Deployment Connection Diagnostics
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
          This tool helps diagnose connection issues between your frontend and backend API.
        </Typography>
        
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Current Configuration:</Typography>
          <Typography variant="body2">Environment: {process.env.NODE_ENV || 'development'}</Typography>
          <Typography variant="body2">API URL: {process.env.REACT_APP_API_URL || '/api'}</Typography>
          <Typography variant="body2" color="text.secondary">
            Note: If running locally, API calls go to /api (proxied to backend). If deployed, they go to the full URL.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Test Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            helperText="Used for login tests (doesn't need to be valid)"
          />
          <TextField
            fullWidth
            label="Test Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Used for login tests (doesn't need to be valid)"
          />
        </Box>
        
        <Button 
          variant="contained" 
          onClick={runTests}
          disabled={loading}
          sx={{ mb: 3, py: 1.5, fontSize: '1.1rem' }}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          fullWidth
        >
          {loading ? 'Running Diagnostics...' : '🔍 Run Connection Diagnostics'}
        </Button>
        
        {testResults.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Diagnostic Results:</Typography>
            
            {testResults.map((result, index) => (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    backgroundColor: result.status === 'success' ? '#e8f5e8' : 
                                   result.status === 'error' ? '#ffebee' :
                                   result.status === 'warning' ? '#fff3e0' : '#e3f2fd',
                    borderLeft: `4px solid ${getStatusColor(result.status)}`
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 8 }}>{getStatusIcon(result.status)}</span>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {result.test}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {result.message}
                  </Typography>
                  
                  {result.url && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>URL Tested:</strong> {result.url}
                    </Typography>
                  )}
                  
                  {result.data && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">Response Data:</Typography>
                      <pre style={{ 
                        background: '#f5f5f5', 
                        padding: '10px', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        maxHeight: '200px',
                        overflow: 'auto',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}>
                        {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
                      </pre>
                    </Box>
                  )}
                  
                  {result.rawResponse && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">Raw Response:</Typography>
                      <pre style={{ 
                        background: '#fff3e0', 
                        padding: '10px', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        maxHeight: '200px',
                        overflow: 'auto',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}>
                        {result.rawResponse}
                      </pre>
                    </Box>
                  )}
                  
                  {result.details && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">Details:</Typography>
                      <pre style={{ 
                        background: '#f1f8e9', 
                        padding: '10px', 
                        borderRadius: '4px',
                        fontSize: '12px',
                        maxHeight: '200px',
                        overflow: 'auto'
                      }}>
                        {typeof result.details === 'string' ? result.details : JSON.stringify(result.details, null, 2)}
                      </pre>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
        
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Troubleshooting Tips:</strong><br />
            1. Check that your backend server is running<br />
            2. Verify your <code>REACT_APP_API_URL</code> environment variable is set correctly<br />
            3. Ensure your backend CORS settings allow requests from your frontend origin<br />
            4. Check that your backend API routes are accessible<br />
            5. Review your deployment configuration on Render
          </Typography>
        </Alert>
        
        <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0f8ff', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Environment Setup:</Typography>
          <Typography variant="body2">
            For deployment on Render, make sure to set these environment variables:
          </Typography>
          <pre style={{ 
            background: '#e8f4fd', 
            padding: '10px', 
            borderRadius: '4px',
            fontSize: '12px',
            margin: '10px 0'
          }}>
            REACT_APP_API_URL=your-render-backend-url/api
          </pre>
          <Typography variant="body2">
            Example: <code>REACT_APP_API_URL=https://your-app-name.onrender.com/api</code>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default DeploymentTestPage;