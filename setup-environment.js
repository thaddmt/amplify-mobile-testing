const path = require('path');
const fs = require('fs');

const envConfigMap = {
  beta: {
    backendApiUrl:
      'https://sysfn8fu4l.execute-api.us-east-1.amazonaws.com/prod',
    streamingApiUrl:
      'wss://streaming-rekognition-gamma.us-east-1.amazonaws.com:443',
    backendApiRegion: 'us-east-1',
    debug: 'TRUE',
  },
  prod: {
    backendApiUrl:
      'https://s0ctzw9239.execute-api.us-east-1.amazonaws.com/prod',
    streamingApiUrl: 'wss://streaming-rekognition.us-east-1.amazonaws.com:443',
    backendApiRegion: 'us-east-1',
    debug: false,
  },
};
const secretsMap = JSON.parse(process.env.secrets);

function getEnvFileContent(envName) {
  const envConfig = envConfigMap[envName];

  const envFileContent = `# Env variables for ${envName}
NEXT_PUBLIC_BACKEND_API_URL=${envConfig.backendApiUrl}
NEXT_PUBLIC_STREAMING_API_URL=${envConfig.streamingApiUrl}
NEXT_PUBLIC_BACKEND_API_REGION=${envConfig.backendApiRegion}
NEXT_PUBLIC_DEBUG=${envConfig.debug}
`;

  return envFileContent;
}

function getCypressEnvFileContent() {
  const cypressEnvFileContent = {
    loginUsername: secretsMap.INTEG_LOGIN_USERNAME,
    loginPassword: secretsMap.INTEG_LOGIN_PASSWORD,
  };

  return JSON.stringify(cypressEnvFileContent, null, 2);
}

function getContentSecurityPolicyForEnv(envName) {
  const envConfig = envConfigMap[envName];

  const allowedUrls = [
    `https://cognito-idp.us-west-2.amazonaws.com/`,
    'https://cognito-identity.us-west-2.amazonaws.com/',

    'https://pinpoint.us-west-2.amazonaws.com/v1/',

    'https://cdn.liveness.rekognition.amazonaws.com/',

    `${envConfig.backendApiUrl}/`,
    `${envConfig.streamingApiUrl}/`,
  ];
  const allowedOrigins = allowedUrls.join(' ');

  return `object-src 'none' ; img-src data: ; connect-src ${allowedOrigins} wss:; upgrade-insecure-requests ;`;
}

function getCustomHeadersForEnv(envName) {
  return `customHeaders:
    - pattern: '**/*'
      headers:
        - key: 'Strict-Transport-Security'
          value: 'max-age=47304000; includeSubDomains'
        - key: 'X-Frame-Options'
          value: 'DENY'
        - key: 'X-XSS-Protection'
          value: '1; mode=block'
        - key: 'X-Content-Type-Options'
          value: 'nosniff'
        - key: 'Cache-Control'
          value: 'no-cache, no-store'
        - key: 'Pragma'
          value: 'no-cache'
        - key: 'Content-Security-Policy-Report-Only'
          value: "${getContentSecurityPolicyForEnv(envName)}"`;
}

function setupEnvironment() {
  const amplifyEnvName = process.env.USER_BRANCH;

  console.log(`Setting up environment: ${amplifyEnvName}`);

  // Create .env file
  const envFileContent = getEnvFileContent(amplifyEnvName);
  const envFilePath = path.join(__dirname, '.env');
  fs.writeFileSync(envFilePath, envFileContent);
  console.log(`Created .env file`);

  // Create cypress.env.json file
  const cypressEnvFileContent = getCypressEnvFileContent();
  const cypressEnvFilePath = path.join(__dirname, 'cypress.env.json');
  fs.writeFileSync(cypressEnvFilePath, cypressEnvFileContent);
  console.log(`Created cypress.env.json file`);

  // Create customHttp.yml file
  const customHttpFileContent = getCustomHeadersForEnv(amplifyEnvName);
  const customHttpFilePath = path.join(__dirname, 'customHttp.yml');
  fs.writeFileSync(customHttpFilePath, customHttpFileContent);
  console.log(`Created customHttp.yml file`);

  console.log('Environment setup complete');
}

setupEnvironment();
