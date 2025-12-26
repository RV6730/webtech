#!/usr/bin/env node

/**
 * Simple test script to verify backend setup
 * This script checks:
 * - All required files exist
 * - No syntax errors in main files
 * - Package.json has correct configuration
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Running backend setup verification...\n');

let hasErrors = false;

// Check required files
const requiredFiles = [
  'server.js',
  'package.json',
  '.env.example',
  '.gitignore',
  'README.md',
  'api.js',
  'seed.js',
  'backend/config/database.js',
  'backend/models/User.js',
  'backend/models/Candidate.js',
  'backend/models/Election.js',
  'backend/models/Vote.js',
  'backend/controllers/authController.js',
  'backend/controllers/candidateController.js',
  'backend/controllers/electionController.js',
  'backend/controllers/voteController.js',
  'backend/middleware/auth.js',
  'backend/routes/auth.js',
  'backend/routes/candidates.js',
  'backend/routes/elections.js',
  'backend/routes/votes.js'
];

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    hasErrors = true;
  }
});

// Check package.json
console.log('\n📦 Checking package.json...');
try {
  const packageJson = require('./package.json');
  
  if (packageJson.main === 'server.js') {
    console.log('  ✅ Main entry point is server.js');
  } else {
    console.log('  ❌ Main entry point is not server.js');
    hasErrors = true;
  }
  
  const requiredDeps = ['express', 'mongoose', 'bcryptjs', 'jsonwebtoken', 'dotenv', 'cors', 'express-validator'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies || !packageJson.dependencies[dep]);
  
  if (missingDeps.length === 0) {
    console.log('  ✅ All required dependencies present');
  } else {
    console.log(`  ❌ Missing dependencies: ${missingDeps.join(', ')}`);
    hasErrors = true;
  }
  
  if (packageJson.scripts && packageJson.scripts.start) {
    console.log('  ✅ Start script configured');
  } else {
    console.log('  ❌ Start script not configured');
    hasErrors = true;
  }
  
  if (packageJson.scripts && packageJson.scripts.seed) {
    console.log('  ✅ Seed script configured');
  } else {
    console.log('  ⚠️  Seed script not configured (optional)');
  }
} catch (error) {
  console.log(`  ❌ Error reading package.json: ${error.message}`);
  hasErrors = true;
}

// Check .env.example
console.log('\n🔐 Checking .env.example...');
try {
  const envExample = fs.readFileSync(path.join(__dirname, '.env.example'), 'utf8');
  const requiredVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET'];
  const missingVars = requiredVars.filter(v => !envExample.includes(v));
  
  if (missingVars.length === 0) {
    console.log('  ✅ All required environment variables present in .env.example');
  } else {
    console.log(`  ❌ Missing variables in .env.example: ${missingVars.join(', ')}`);
    hasErrors = true;
  }
} catch (error) {
  console.log(`  ❌ Error reading .env.example: ${error.message}`);
  hasErrors = true;
}

// Check .gitignore
console.log('\n🚫 Checking .gitignore...');
try {
  const gitignore = fs.readFileSync(path.join(__dirname, '.gitignore'), 'utf8');
  const requiredIgnores = ['node_modules', '.env'];
  const missingIgnores = requiredIgnores.filter(i => !gitignore.includes(i));
  
  if (missingIgnores.length === 0) {
    console.log('  ✅ Critical files/folders are in .gitignore');
  } else {
    console.log(`  ❌ Missing in .gitignore: ${missingIgnores.join(', ')}`);
    hasErrors = true;
  }
} catch (error) {
  console.log(`  ❌ Error reading .gitignore: ${error.message}`);
  hasErrors = true;
}

// Check syntax of main JavaScript files
console.log('\n🔍 Checking JavaScript syntax...');
const { execSync } = require('child_process');
const jsFiles = ['server.js', 'api.js', 'seed.js', 'backend/config/database.js'];

jsFiles.forEach(file => {
  try {
    execSync(`node -c ${file}`, { stdio: 'pipe' });
    console.log(`  ✅ ${file}`);
  } catch (error) {
    console.log(`  ❌ ${file} - Syntax error`);
    hasErrors = true;
  }
});

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Verification FAILED - Please fix the errors above');
  process.exit(1);
} else {
  console.log('✅ Verification PASSED - Backend setup looks good!');
  console.log('\n📝 Next steps:');
  console.log('  1. Copy .env.example to .env and configure');
  console.log('  2. Start MongoDB (mongod)');
  console.log('  3. Run: npm run seed (to populate sample data)');
  console.log('  4. Run: npm start (to start the server)');
  console.log('  5. Visit: http://localhost:5000');
  process.exit(0);
}
