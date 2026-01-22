// Debug utilities for deployment issues
export const debugAuthFlow = async () => {
  console.log('=== AUTH DEBUG START ===');
  
  // Check environment
  console.log('Environment:', process.env.NODE_ENV);
  console.log('API Base URL:', process.env.REACT_APP_API_URL || '/api');
  
  // Test basic connectivity
  try {
    const healthResponse = await fetch('/health');
    console.log('Health check status:', healthResponse.status);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health data:', healthData);
    }
  } catch (error) {
    console.error('Health check failed:', error);
  }
  
  // Test API endpoint
  try {
    const testResponse = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'test123' })
    });
    console.log('Test login status:', testResponse.status);
    console.log('Test login headers:', Object.fromEntries(testResponse.headers.entries()));
    
    const contentType = testResponse.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const testData = await testResponse.json();
      console.log('Test login response:', testData);
    } else {
      const testText = await testResponse.text();
      console.log('Test login text response:', testText);
    }
  } catch (error) {
    console.error('Test login failed:', error);
  }
  
  console.log('=== AUTH DEBUG END ===');
};

// Call this function to run diagnostics
export const runDiagnostics = () => {
  debugAuthFlow();
};