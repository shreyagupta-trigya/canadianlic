// Isolated test for parse functions without loading the full module
const fs = require('fs');
const path = require('path');

// Read the file content
const filePath = path.join(__dirname, 'functions', 'backend_function', 'controller', 'lead', 'leadController.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Extract function definitions using regex
function extractFunction(name) {
  // Try async function first
  let regex = new RegExp(`async function ${name}\\s*\\([^)]*\\)\\s*{[\\s\\S]*?}(?=\\s*(?:async function|function|exports\\.|//|$))`, 'g');
  let match = fileContent.match(regex);
  if (match) return match[0];

  // Try regular function
  regex = new RegExp(`function ${name}\\s*\\([^)]*\\)\\s*{[\\s\\S]*?}(?=\\s*(?:async function|function|exports\\.|//|$))`, 'g');
  match = fileContent.match(regex);
  return match ? match[0] : null;
}

console.log('Testing isolated parse functions...\n');

// Test parseContactData
const parseContactDataFunc = extractFunction('parseContactData');
if (parseContactDataFunc) {
  console.log('✓ parseContactData function extracted successfully');
  // Check if it has the expected structure
  if (parseContactDataFunc.includes('insuranceLeadOwner') && parseContactDataFunc.includes('firstName')) {
    console.log('✓ parseContactData has expected fields');
  } else {
    console.log('✗ parseContactData missing expected fields');
  }
} else {
  console.log('✗ parseContactData function not found');
}

// Test parseFamiltyTree
const parseFamiltyTreeFunc = extractFunction('parseFamiltyTree');
if (parseFamiltyTreeFunc) {
  console.log('✓ parseFamiltyTree function extracted successfully');
  if (parseFamiltyTreeFunc.includes('relationShipStatus') && parseFamiltyTreeFunc.includes('leadId')) {
    console.log('✓ parseFamiltyTree has expected fields');
  } else {
    console.log('✗ parseFamiltyTree missing expected fields');
  }
} else {
  console.log('✗ parseFamiltyTree function not found');
}

// Test parseLeadInfomration
const parseLeadInfomrationFunc = extractFunction('parseLeadInfomration');
if (parseLeadInfomrationFunc) {
  console.log('✓ parseLeadInfomration function extracted successfully');
  if (parseLeadInfomrationFunc.includes('street') && parseLeadInfomrationFunc.includes('adAccount')) {
    console.log('✓ parseLeadInfomration has expected fields');
  } else {
    console.log('✗ parseLeadInfomration missing expected fields');
  }
} else {
  console.log('✗ parseLeadInfomration function not found');
}

// Test parseDescription
const parseDescriptionFunc = extractFunction('parseDescription');
if (parseDescriptionFunc) {
  console.log('✓ parseDescription function extracted successfully');
  if (parseDescriptionFunc.includes('typeOfInsuranceLooking') && parseDescriptionFunc.includes('whatsYourProfession')) {
    console.log('✓ parseDescription has expected fields');
  } else {
    console.log('✗ parseDescription missing expected fields');
  }
} else {
  console.log('✗ parseDescription function not found');
}

// Test parseSerce
const parseSerceFunc = extractFunction('parseSerce');
if (parseSerceFunc) {
  console.log('✓ parseSerce function extracted successfully');
  if (parseSerceFunc.includes('lifeInsurance') && parseSerceFunc.includes('campaignidData')) {
    console.log('✓ parseSerce has expected fields');
  } else {
    console.log('✗ parseSerce missing expected fields');
  }
} else {
  console.log('✗ parseSerce function not found');
}

// Test parseAdvisorData
const parseAdvisorDataFunc = extractFunction('parseAdvisorData');
if (parseAdvisorDataFunc) {
  console.log('✓ parseAdvisorData function extracted successfully');
  if (parseAdvisorDataFunc.includes('advisorLead') && parseAdvisorDataFunc.includes('advisorFaceBook')) {
    console.log('✓ parseAdvisorData has expected structure');
  } else {
    console.log('✗ parseAdvisorData missing expected structure');
  }
} else {
  console.log('✗ parseAdvisorData function not found');
}

// Test processSubform
const processSubformFunc = extractFunction('processSubform');
if (processSubformFunc) {
  console.log('✓ processSubform function extracted successfully');
  if (processSubformFunc.includes('updateArray') && processSubformFunc.includes('insertArray')) {
    console.log('✓ processSubform has expected logic');
  } else {
    console.log('✗ processSubform missing expected logic');
  }
} else {
  console.log('✗ processSubform function not found');
}

// Test getSubformFields
const getSubformFieldsFunc = extractFunction('getSubformFields');
if (getSubformFieldsFunc) {
  console.log('✓ getSubformFields function extracted successfully');
  if (getSubformFieldsFunc.includes('switch') && getSubformFieldsFunc.includes('case "festivals"')) {
    console.log('✓ getSubformFields has expected switch logic');
  } else {
    console.log('✗ getSubformFields missing expected logic');
  }
} else {
  console.log('✗ getSubformFields function not found');
}

// Test downloadFile
const downloadFileFunc = extractFunction('downloadFile');
if (downloadFileFunc) {
  console.log('✓ downloadFile function extracted successfully');
  if (downloadFileFunc.includes('createObjectCsvStringifier')) {
    console.log('✓ downloadFile has CSV logic');
  } else {
    console.log('✗ downloadFile missing CSV logic');
  }
} else {
  console.log('✗ downloadFile function not found');
}

// Test findAdditionalKeys
const findAdditionalKeysFunc = extractFunction('findAdditionalKeys');
if (findAdditionalKeysFunc) {
  console.log('✓ findAdditionalKeys function extracted successfully');
  if (findAdditionalKeysFunc.includes('compareObjects')) {
    console.log('✓ findAdditionalKeys has comparison logic');
  } else {
    console.log('✗ findAdditionalKeys missing comparison logic');
  }
} else {
  console.log('✗ findAdditionalKeys function not found');
}

console.log('\n✓ Isolated function testing completed!');

// Check for any obvious syntax issues by counting braces
const openBraces = (fileContent.match(/\{/g) || []).length;
const closeBraces = (fileContent.match(/\}/g) || []).length;

if (openBraces === closeBraces) {
  console.log('✓ Braces are balanced');
} else {
  console.log(`✗ Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
}

// Check for common syntax issues
const syntaxChecks = [
  { pattern: /function\s+\w+\s*\([^)]*$/m, issue: 'Unclosed function parameter list' },
  { pattern: /if\s*\([^)]*$/m, issue: 'Unclosed if condition' },
  { pattern: /for\s*\([^)]*$/m, issue: 'Unclosed for loop' },
  { pattern: /while\s*\([^)]*$/m, issue: 'Unclosed while loop' },
];

let syntaxErrors = false;
syntaxChecks.forEach(check => {
  if (check.pattern.test(fileContent)) {
    console.log(`✗ Potential syntax error: ${check.issue}`);
    syntaxErrors = true;
  }
});

if (!syntaxErrors) {
  console.log('✓ No obvious syntax errors detected');
}
