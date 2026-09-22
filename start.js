const { spawn } = require('child_process');
const path = require('path');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

console.log('========================================================');
console.log('🌱 AgriSetu Unified Runner');
console.log('========================================================');
console.log('Backend running at:  http://localhost:5000');
console.log('Frontend running at: http://localhost:5173');
console.log('Demo Credentials:');
console.log('  - Farmer:       9876543210       / AgriSetu@2025');
console.log('  - Company:      company@test.com / AgriSetu@2025');
console.log('  - Professional: pro@test.com     / AgriSetu@2025');
console.log('========================================================\n');

const backend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  console.log('\nStopping AgriSetu servers...');
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
