import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { relationShipStatusOptions, choice } from '../utils/picklist';

const FamilyTree = ({ onNext, onPrevious, familyTree, isDisabled = false }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    relationShipStatus: '',
    nameOfSpouse: '',
    numberOfSpouse: '',
    anniversaryDate: '',
    spouseDateOfBirth: '',
    phoneOfSpouse: '',
    emailOfSpouse: '',
    nameOfCommonLawPartner: '',
    commonLawDateOfBirth: '',
    dependentParents: '',
    numberOfDependentParents: 0,
    dependentChildren: '',
    numberOfDependentChildren: 0,
    siblings: '',
    numberOfSiblings: 0,
    ...familyTree
  });

  const [siblingData, setSiblingData] = useState([]);
  const [dependentChildrenData, setDependentChildrenData] = useState([]);
  const [dependentParentsData, setDependentParentsData] = useState([]);
  const [emergencyContactData, setEmergencyContactData] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);

  useEffect(() => {
    if (familyTree) {
      setFormData({ ...familyTree });
      setSiblingData(Array.isArray(familyTree.siblingData) ? [...familyTree.siblingData] : []);
      setDependentChildrenData(Array.isArray(familyTree.dependentChildrenData) ? [...familyTree.dependentChildrenData] : []);
      setDependentParentsData(Array.isArray(familyTree.dependentParentsData) ? [...familyTree.dependentParentsData] : []);
      setEmergencyContactData(Array.isArray(familyTree.emergencyContactData) ? [...familyTree.emergencyContactData] : []);
    }
  }, [familyTree]);

  // Reactive updates for dependent parents table
  useEffect(() => {
    const count = parseInt(formData.numberOfDependentParents) || 0;
    const current = dependentParentsData.length;

    if (formData.dependentParents === 'Yes') {
      if (count > current) {
        const newRows = Array.from({ length: count - current }, () => ({
          relationship: '',
          name: '',
          dob: '',
          email: '',
          phone: '',
          age: '',
        }));
        setDependentParentsData(prev => [...prev, ...newRows]);
      } else if (count < current) {
        setDependentParentsData(prev => prev.slice(0, count));
      }
    } else {
      setDependentParentsData([]);
    }
  }, [formData.dependentParents, formData.numberOfDependentParents]);

  // Reactive updates for dependent children table
  useEffect(() => {
    const count = parseInt(formData.numberOfDependentChildren) || 0;
    const current = dependentChildrenData.length;

    if (formData.dependentChildren === 'Yes') {
      if (count > current) {
        const newRows = Array.from({ length: count - current }, () => ({
          relationship: '',
          name: '',
          dob: '',
          email: '',
          phone: '',
          age: '',
        }));
        setDependentChildrenData(prev => [...prev, ...newRows]);
      } else if (count < current) {
        setDependentChildrenData(prev => prev.slice(0, count));
      }
    } else {
      setDependentChildrenData([]);
    }
  }, [formData.dependentChildren, formData.numberOfDependentChildren]);

  // Reactive updates for siblings table
  useEffect(() => {
    const count = parseInt(formData.numberOfSiblings) || 0;
    const current = siblingData.length;

    if (formData.siblings === 'Yes') {
      if (count > current) {
        const newRows = Array.from({ length: count - current }, () => ({
          relationship: '',
          name: '',
          dob: '',
          email: '',
          phone: '',
          age: '',
        }));
        setSiblingData(prev => [...prev, ...newRows]);
      } else if (count < current) {
        setSiblingData(prev => prev.slice(0, count));
      }
    } else {
      setSiblingData([]);
    }
  }, [formData.siblings, formData.numberOfSiblings]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRowToDependentParentsData = async () => {
    setIsAddingMember(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
    setDependentParentsData(prev => [...prev, {
      relationship: '',
      name: '',
      dob: '',
      email: '',
      phone: '',
      age: '',
    }]);
    setFormData(prev => ({ ...prev, numberOfDependentParents: prev.numberOfDependentParents + 1 }));
    setIsAddingMember(false);
  };

  const deleteDependentParentsData = (index) => {
    setDependentParentsData(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, numberOfDependentParents: prev.numberOfDependentParents - 1 }));
  };

  const addRowToDependentChildrenData = async () => {
    setIsAddingMember(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setDependentChildrenData(prev => [...prev, {
      relationship: '',
      name: '',
      dob: '',
      email: '',
      phone: '',
      age: '',
    }]);
    setFormData(prev => ({ ...prev, numberOfDependentChildren: prev.numberOfDependentChildren + 1 }));
    setIsAddingMember(false);
  };

  const deleteDependentChildrenData = (index) => {
    setDependentChildrenData(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, numberOfDependentChildren: prev.numberOfDependentChildren - 1 }));
  };

  const addRowToSiblingData = async () => {
    setIsAddingMember(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setSiblingData(prev => [...prev, {
      relationship: '',
      name: '',
      dob: '',
      email: '',
      phone: '',
      age: '',
    }]);
    setFormData(prev => ({ ...prev, numberOfSiblings: prev.numberOfSiblings + 1 }));
    setIsAddingMember(false);
  };

  const deleteSiblingData = (index) => {
    setSiblingData(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, numberOfSiblings: prev.numberOfSiblings - 1 }));
  };

  const addRowToEmergencyContact = async () => {
    setIsAddingMember(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setEmergencyContactData(prev => [...prev, {
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
      emergencyContactEmail: '',
    }]);
    setIsAddingMember(false);
  };

  const deleteEmergencyContact = (index) => {
    setEmergencyContactData(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (emergencyContactData.length === 0) {
      newErrors.emergencyContact = 'At least one emergency contact is required';
    } else {
      emergencyContactData.forEach((contact, index) => {
        if (!contact.emergencyContactName.trim()) {
          newErrors[`emergencyContactName_${index}`] = 'Emergency contact name is required';
        }
        if (!contact.emergencyContactPhone.trim()) {
          newErrors[`emergencyContactPhone_${index}`] = 'Emergency contact phone is required';
        }
        if (!contact.emergencyContactRelationship.trim()) {
          newErrors[`emergencyContactRelationship_${index}`] = 'Emergency contact relationship is required';
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        onNext({
          ...formData,
          siblingData,
          dependentChildrenData,
          dependentParentsData,
          emergencyContactData
        });
        setIsLoading(false);
      }, 500);
    }
  };

  const previousStep = () => {
    onPrevious();
  };

  return (
    <div className="space-y-6">
      <h5 className="main-heading mb-0 ps-2">Family Tree</h5>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Relationship Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Label className="text-sm font-medium">Select Relationship Status</Label>
            <Select
              value={formData.relationShipStatus}
              onValueChange={(value) => handleInputChange('relationShipStatus', value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="mt-1 w-80">
                <SelectValue placeholder="Select Relationship Status" />
              </SelectTrigger>
              <SelectContent>
                {relationShipStatusOptions.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {formData.relationShipStatus === 'Married' && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Spouse Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium">Name of Spouse</Label>
                <Input
                  type="text"
                  value={formData.nameOfSpouse}
                  onChange={(e) => handleInputChange('nameOfSpouse', e.target.value)}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Number of Spouse</Label>
                <Input
                  type="text"
                  value={formData.numberOfSpouse}
                  onChange={(e) => handleInputChange('numberOfSpouse', e.target.value)}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Anniversary Date</Label>
                <Input
                  type="date"
                  value={formData.anniversaryDate}
                  onChange={(e) => handleInputChange('anniversaryDate', e.target.value)}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Spouse's Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.spouseDateOfBirth}
                  onChange={(e) => handleInputChange('spouseDateOfBirth', e.target.value)}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Phone of Spouse</Label>
                <Input
                  type="tel"
                  value={formData.phoneOfSpouse}
                  onChange={(e) => handleInputChange('phoneOfSpouse', e.target.value)}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Email of Spouse</Label>
                <Input
                  type="email"
                  value={formData.emailOfSpouse}
                  onChange={(e) => handleInputChange('emailOfSpouse', e.target.value)}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {formData.relationShipStatus === 'Common Law' && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Common Law Partner Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name of Common Law Partner</Label>
                <Input
                  type="text"
                  value={formData.nameOfCommonLawPartner}
                  onChange={(e) => handleInputChange('nameOfCommonLawPartner', e.target.value)}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Common Law Partner's Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.commonLawDateOfBirth}
                  onChange={(e) => handleInputChange('commonLawDateOfBirth', e.target.value)}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dependent Parents */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Dependent Parents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="max-w-md">
              <Label className="text-sm font-medium">Do you have dependent parents?</Label>
              <Select
                value={formData.dependentParents}
                onValueChange={(value) => {
                  handleInputChange('dependentParents', value);
                  if (value === 'No') {
                    setDependentParentsData([]);
                    handleInputChange('numberOfDependentParents', 0);
                  }
                }}
                disabled={isDisabled}
              >
                <SelectTrigger className="mt-1 w-80">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.dependentParents === 'Yes' && (
              <div className="max-w-md">
                <Label className="text-sm font-medium">Number of Dependent Parents</Label>
                <Input
                  type="number"
                  value={formData.numberOfDependentParents}
                  onChange={(e) => {
                    handleInputChange('numberOfDependentParents', e.target.value);
                  }}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
            )}

            {dependentParentsData.length > 0 && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Relationship</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Date of Birth</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dependentParentsData.map((parent, index) => (
                        <tr key={index} className="even:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="text"
                              value={parent.relationship}
                              onChange={(e) => {
                                const newData = [...dependentParentsData];
                                newData[index].relationship = e.target.value;
                                setDependentParentsData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="text"
                              value={parent.name}
                              onChange={(e) => {
                                const newData = [...dependentParentsData];
                                newData[index].name = e.target.value;
                                setDependentParentsData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="date"
                              value={parent.dob}
                              onChange={(e) => {
                                const newData = [...dependentParentsData];
                                newData[index].dob = e.target.value;
                                setDependentParentsData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="email"
                              value={parent.email}
                              onChange={(e) => {
                                const newData = [...dependentParentsData];
                                newData[index].email = e.target.value;
                                setDependentParentsData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="tel"
                              value={parent.phone}
                              onChange={(e) => {
                                const newData = [...dependentParentsData];
                                newData[index].phone = e.target.value;
                                setDependentParentsData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="text"
                              value={parent.age}
                              onChange={(e) => {
                                const newData = [...dependentParentsData];
                                newData[index].age = e.target.value;
                                setDependentParentsData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteDependentParentsData(index)}
                              className="text-red-500 hover:text-red-700"
                              disabled={isDisabled}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button
                  className="btn mb-0 btn-color btn-md"
                  onClick={addRowToDependentParentsData}
                  disabled={isDisabled}
                >
                  Add Parent
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dependent Children */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Dependent Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="max-w-md">
              <Label className="text-sm font-medium">Do you have dependent children?</Label>
              <Select
                value={formData.dependentChildren}
                onValueChange={(value) => {
                  handleInputChange('dependentChildren', value);
                  if (value === 'No') {
                    setDependentChildrenData([]);
                    handleInputChange('numberOfDependentChildren', 0);
                  }
                }}
                disabled={isDisabled}
              >
                <SelectTrigger className="mt-1 w-80">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.dependentChildren === 'Yes' && (
              <div className="max-w-md">
                <Label className="text-sm font-medium">Number of Dependent Children</Label>
                <Input
                  type="number"
                  value={formData.numberOfDependentChildren}
                  onChange={(e) => {
                    handleInputChange('numberOfDependentChildren', e.target.value);
                  }}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
            )}

            {dependentChildrenData.length > 0 && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Relationship</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Date of Birth</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dependentChildrenData.map((child, index) => (
                        <tr key={index} className="even:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="text"
                              value={child.relationship}
                              onChange={(e) => {
                                const newData = [...dependentChildrenData];
                                newData[index].relationship = e.target.value;
                                setDependentChildrenData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="text"
                              value={child.name}
                              onChange={(e) => {
                                const newData = [...dependentChildrenData];
                                newData[index].name = e.target.value;
                                setDependentChildrenData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="date"
                              value={child.dob}
                              onChange={(e) => {
                                const newData = [...dependentChildrenData];
                                newData[index].dob = e.target.value;
                                setDependentChildrenData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="email"
                              value={child.email}
                              onChange={(e) => {
                                const newData = [...dependentChildrenData];
                                newData[index].email = e.target.value;
                                setDependentChildrenData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="tel"
                              value={child.phone}
                              onChange={(e) => {
                                const newData = [...dependentChildrenData];
                                newData[index].phone = e.target.value;
                                setDependentChildrenData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="text"
                              value={child.age}
                              onChange={(e) => {
                                const newData = [...dependentChildrenData];
                                newData[index].age = e.target.value;
                                setDependentChildrenData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteDependentChildrenData(index)}
                              className="text-red-500 hover:text-red-700"
                              disabled={isDisabled}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button
                  className="btn mb-0 btn-color btn-md"
                  onClick={addRowToDependentChildrenData}
                  disabled={isDisabled}
                >
                  Add Child
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Siblings */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Siblings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="max-w-md">
              <Label className="text-sm font-medium">Do you have siblings?</Label>
              <Select
                value={formData.siblings}
                onValueChange={(value) => {
                  handleInputChange('siblings', value);
                  if (value === 'No') {
                    setSiblingData([]);
                    handleInputChange('numberOfSiblings', 0);
                  }
                }}
                disabled={isDisabled}
              >
                <SelectTrigger className="mt-1 w-80">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {choice.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.siblings === 'Yes' && (
              <div className="max-w-md">
                <Label className="text-sm font-medium">Number of Siblings</Label>
                <Input
                  type="number"
                  value={formData.numberOfSiblings}
                  onChange={(e) => {
                    handleInputChange('numberOfSiblings', e.target.value);
                  }}
                  className="mt-1"
                  disabled={isDisabled}
                />
              </div>
            )}

            {siblingData.length > 0 && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Relationship</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Date of Birth</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siblingData.map((sibling, index) => (
                        <tr key={index} className="even:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="text"
                              value={sibling.relationship}
                              onChange={(e) => {
                                const newData = [...siblingData];
                                newData[index].relationship = e.target.value;
                                setSiblingData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="text"
                              value={sibling.name}
                              onChange={(e) => {
                                const newData = [...siblingData];
                                newData[index].name = e.target.value;
                                setSiblingData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="date"
                              value={sibling.dob}
                              onChange={(e) => {
                                const newData = [...siblingData];
                                newData[index].dob = e.target.value;
                                setSiblingData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="email"
                              value={sibling.email}
                              onChange={(e) => {
                                const newData = [...siblingData];
                                newData[index].email = e.target.value;
                                setSiblingData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="tel"
                              value={sibling.phone}
                              onChange={(e) => {
                                const newData = [...siblingData];
                                newData[index].phone = e.target.value;
                                setSiblingData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Input
                              type="text"
                              value={sibling.age}
                              onChange={(e) => {
                                const newData = [...siblingData];
                                newData[index].age = e.target.value;
                                setSiblingData(newData);
                              }}
                              className="h-8 w-full"
                              disabled={isDisabled}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteSiblingData(index)}
                              className="text-red-500 hover:text-red-700"
                              disabled={isDisabled}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button
                  className="btn mb-0 btn-color btn-md"
                  onClick={addRowToSiblingData}
                  disabled={isDisabled}
                >
                  Add Sibling
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Emergency Contact <span className="text-red-500">*</span></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContactData.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Name *</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Phone *</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Relationship *</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emergencyContactData.map((contact, index) => (
                      <tr key={index} className="even:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">
                          <Input
                            type="text"
                            value={contact.emergencyContactName}
                            onChange={(e) => {
                              const newData = [...emergencyContactData];
                              newData[index].emergencyContactName = e.target.value;
                              setEmergencyContactData(newData);
                            }}
                            className="h-8 w-full"
                            disabled={isDisabled}
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Input
                            type="tel"
                            value={contact.emergencyContactPhone}
                            onChange={(e) => {
                              const newData = [...emergencyContactData];
                              newData[index].emergencyContactPhone = e.target.value;
                              setEmergencyContactData(newData);
                            }}
                            className="h-8 w-full"
                            disabled={isDisabled}
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Input
                            type="text"
                            value={contact.emergencyContactRelationship}
                            onChange={(e) => {
                              const newData = [...emergencyContactData];
                              newData[index].emergencyContactRelationship = e.target.value;
                              setEmergencyContactData(newData);
                            }}
                            className="h-8 w-full"
                            disabled={isDisabled}
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Input
                            type="email"
                            value={contact.emergencyContactEmail}
                            onChange={(e) => {
                              const newData = [...emergencyContactData];
                              newData[index].emergencyContactEmail = e.target.value;
                              setEmergencyContactData(newData);
                            }}
                            className="h-8 w-full"
                            disabled={isDisabled}
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteEmergencyContact(index)}
                            className="text-red-500 hover:text-red-700"
                            disabled={isDisabled}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Button
              className="btn mb-0 btn-color btn-md"
              onClick={addRowToEmergencyContact}
              disabled={isDisabled}
            >
              Add Emergency Contact
            </Button>
          </div>
        </CardContent>
      </Card>



      <div className="button-row flex justify-center mt-4 gap-4">
        <Button
          className="btn mb-1 bg-gradient-light btn-md"
          type="button"
          onClick={previousStep}
        >
          Prev
        </Button>
        <Button
          className="btn mb-1 bg-gradient-dark btn-md"
          onClick={nextStep}
          type="button"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FamilyTree;
