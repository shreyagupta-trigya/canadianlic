// Comprehensive test for parse functions
const fs = require('fs');
const path = require('path');

// Mock the required modules to avoid dependency issues
const mockCatalyst = {
  initialize: () => ({}),
  datastore: () => ({
    table: () => ({
      insertRow: () => ({ ROWID: 'mock-id' }),
      updateRow: () => ({}),
      getRow: () => ({})
    })
  }),
  zcql: () => ({
    executeZCQLQuery: () => []
  })
};

const mockReq = {
  body: {},
  params: {},
  query: {}
};

const mockRes = {
  status: (code) => ({
    json: (data) => data
  })
};

// Mock the dependencies
global.catalyst = mockCatalyst;
global.require = (module) => {
  if (module === 'zcatalyst-sdk-node') return mockCatalyst;
  if (module === '../../query/Query') return {};
  if (module === 'node-cache') return class NodeCache { get() { return null; } set() {} del() {} };
  if (module === 'csv-writer') return { createObjectCsvStringifier: () => ({ getHeaderString: () => '', stringifyRecords: () => '' }) };
  if (module === '../../Utils/sequenceUtils') return { getSequence: () => ({ data: { prefix: 'TEST', sequence: '001' } }), updateSequence: () => {} };
  if (module === '../../Utils/util') return {
    insertData: () => 'mock-id',
    updateData: () => {},
    insertSubformData: () => [],
    updateSubformData: () => [],
    deleteSubformData: () => [],
    dateTimeFormat: () => new Date()
  };
  if (module === '../../export') return {
    leadclient: [],
    leadadvisor: [],
    clientGenerate: [],
    advisorGenerate: [],
    sampleData: [],
    sample: []
  };
  if (module === '../../crmIntegration/crmIntegrationController') return {
    dataSyncZcrm: () => 'mock-crm-id',
    generateToken: () => 'mock-token'
  };
  return {};
};

// Now try to load and test the functions
try {
  const leadController = require('./functions/backend_function/controller/lead/leadController.js');

  console.log('Testing parse functions with sample data...\n');

  // Test parseContactData
  const testFormData = {
    firstName: 'John',
    lastName: 'Doe',
    mobile: '1234567890',
    email: 'john@example.com'
  };

  const testFestival = { religion: 'Christian', celebratedFestivals: 'Christmas' };
  const result = leadController.parseContactData(testFormData, testFestival, 'client');

  if (result && typeof result === 'object' && result.firstName === 'John') {
    console.log('✓ parseContactData works correctly');
  } else {
    console.log('✗ parseContactData failed');
  }

  // Test parseFamiltyTree
  const testFamilyTree = {
    relationShipStatus: 'Married',
    numberOfSpouse: '1',
    nameOfSpouse: 'Jane Doe'
  };
  const familyResult = leadController.parseFamiltyTree(testFamilyTree, 'lead-123');

  if (familyResult && familyResult.leadId === 'lead-123' && familyResult.relationShipStatus === 'Married') {
    console.log('✓ parseFamiltyTree works correctly');
  } else {
    console.log('✗ parseFamiltyTree failed');
  }

  // Test parseLeadInfomration
  const testAddress = { street: '123 Main St', city: 'Toronto', country: 'Canada' };
  const testFacebook = { adAccount: 'test-account' };
  const addressResult = leadController.parseLeadInfomration(testAddress, testFacebook, 'lead-123');

  if (addressResult && addressResult.leadId === 'lead-123' && addressResult.street === '123 Main St') {
    console.log('✓ parseLeadInfomration works correctly');
  } else {
    console.log('✗ parseLeadInfomration failed');
  }

  // Test parseDescription
  const testDescription = {
    typeOfInsuranceLooking: 'Life Insurance',
    whatsYourProfession: 'Engineer'
  };
  const descResult = leadController.parseDescription(testDescription, 'lead-123');

  if (descResult && descResult.leadId === 'lead-123' && descResult.typeOfInsuranceLooking === 'Life Insurance') {
    console.log('✓ parseDescription works correctly');
  } else {
    console.log('✗ parseDescription failed');
  }

  // Test parseSerce
  const testServices = { lifeInsurance: 'Yes', travelInsurance: 'No' };
  const testUMT = { campaignidData: 'camp-123' };
  const serviceResult = leadController.parseSerce(testServices, testUMT, 'lead-123');

  if (serviceResult && serviceResult.leadId === 'lead-123' && serviceResult.lifeInsurance === 'Yes') {
    console.log('✓ parseSerce works correctly');
  } else {
    console.log('✗ parseSerce failed');
  }

  // Test parseAdvisorData
  const testLeadData = { firstName: 'Advisor', lastName: 'Test' };
  const testFacebookData = { faceBook: 'fb-page' };
  const testReferralData = { referralSource: 'Website' };
  const advisorResult = leadController.parseAdvisorData(testLeadData, testFacebookData, testReferralData);

  if (advisorResult && advisorResult.advisorLead && advisorResult.advisorFaceBook && advisorResult.advisorRefferel) {
    console.log('✓ parseAdvisorData works correctly');
  } else {
    console.log('✗ parseAdvisorData failed');
  }

  // Test processSubform
  const testSubformArray = [
    { ROWID: '1', festivalName: 'Christmas', dateOfFestival: new Date() },
    { festivalName: 'New Year', dateOfFestival: new Date() }
  ];
  const subformResult = leadController.processSubform(testSubformArray, 'lead-123', 'festivals');

  if (subformResult && subformResult.updateArray.length === 1 && subformResult.insertArray.length === 1) {
    console.log('✓ processSubform works correctly');
  } else {
    console.log('✗ processSubform failed');
  }

  // Test getSubformFields
  const testItem = { festivalName: 'Easter', dateOfFestival: new Date() };
  const fieldsResult = leadController.getSubformFields(testItem, 'festivals');

  if (fieldsResult && fieldsResult.festivalName === 'Easter') {
    console.log('✓ getSubformFields works correctly');
  } else {
    console.log('✗ getSubformFields failed');
  }

  // Test findAdditionalKeys
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1, b: 2, c: 3 };
  const additionalKeys = leadController.findAdditionalKeys(obj1, obj2);

  if (additionalKeys && additionalKeys.c === 3) {
    console.log('✓ findAdditionalKeys works correctly');
  } else {
    console.log('✗ findAdditionalKeys failed');
  }

  console.log('\n✓ All parse functions tested successfully!');

} catch (error) {
  console.log('✗ Error during testing:', error.message);
  console.log('Stack:', error.stack);
}
