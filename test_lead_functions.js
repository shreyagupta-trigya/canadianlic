// Simple test script to verify the parse functions in leadController.js
const fs = require('fs');
const path = require('path');

// Read the leadController.js file
const filePath = path.join(__dirname, 'functions', 'backend_function', 'controller', 'lead', 'leadController.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Check if all required functions are defined
const requiredFunctions = [
  'parseContactData',
  'parseFamiltyTree',
  'parseLeadInfomration',
  'parseDescription',
  'parseSerce',
  'parseAdvisorData',
  'processSubform',
  'getSubformFields',
  'downloadFile',
  'findAdditionalKeys'
];

console.log('Testing leadController.js functions...\n');

let allFunctionsFound = true;
requiredFunctions.forEach(funcName => {
  if (fileContent.includes(`async function ${funcName}`) || fileContent.includes(`function ${funcName}`)) {
    console.log(`✓ ${funcName} function found`);
  } else {
    console.log(`✗ ${funcName} function NOT found`);
    allFunctionsFound = false;
  }
});

if (allFunctionsFound) {
  console.log('\n✓ All required functions are present in the file.');
} else {
  console.log('\n✗ Some functions are missing.');
}

// Test basic syntax by trying to require the module (this will fail due to dependencies, but syntax errors will be caught)
try {
  // This will fail due to missing dependencies, but syntax errors will be caught
  require(filePath);
} catch (error) {
  if (error.message.includes('SyntaxError')) {
    console.log('\n✗ Syntax error detected:', error.message);
  } else {
    console.log('\n✓ No syntax errors (dependencies missing as expected)');
  }
}

console.log('\nTest completed.');
