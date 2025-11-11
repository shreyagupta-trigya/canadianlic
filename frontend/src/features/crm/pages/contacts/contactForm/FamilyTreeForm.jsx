import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from 'lucide-react';

const FamilyTreeForm = ({ formData, setFormData, isDisabled , handlePrevious, handleNext }) => {
  // Ensure formData is always an object
  const safeFormData = formData || {};

  const [errors, setErrors] = useState({});
  const [siblingData, setSiblingData] = useState(safeFormData.siblingData || []);
  const [dependentChildrenData, setDependentChildrenData] = useState(safeFormData.dependentChildrenData || []);
  const [dependentParentsData, setDependentParentsData] = useState(safeFormData.dependentParentsData || []);
  const [emergencyContactData, setEmergencyContactData] = useState(safeFormData.emergencyContactData || []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };


  // Sibling methods
  const addRowToSiblingData = () => {
    setSiblingData([...siblingData, {
      relationship: "",
      name: "",
      dob: "",
      email: "",
      phone: "",
      age: "",
    }]);
  };

  const deleteSiblingData = (index) => {
    setSiblingData(siblingData.filter((_, i) => i !== index));
  };

  // Dependent Children methods
  const addRowToDependentChildrenData = () => {
    setDependentChildrenData([...dependentChildrenData, {
      relationship: "",
      name: "",
      dob: "",
      email: "",
      phone: "",
      age: "",
    }]);
  };

  const deleteDependentChildrenData = (index) => {
    setDependentChildrenData(dependentChildrenData.filter((_, i) => i !== index));
  };

  // Dependent Parents methods
  const addRowToDependentParentsData = () => {
    setDependentParentsData([...dependentParentsData, {
      relationship: "",
      name: "",
      dob: "",
      email: "",
      phone: "",
      age: "",
    }]);
  };

  const deleteDependentParentsData = (index) => {
    setDependentParentsData(dependentParentsData.filter((_, i) => i !== index));
  };

  // Emergency Contact methods
  const addRowToEmergencyContact = () => {
    setEmergencyContactData([...emergencyContactData, {
      emergencyContactEmail: "",
      emergencyContactRelationship: "",
      emergencyContactPhone: "",
      emergencyContactName: "",
    }]);
  };

  const deleteEmergencyContact = (index) => {
    setEmergencyContactData(emergencyContactData.filter((_, i) => i !== index));
  };

  return (
    <>
    <div className="space-y-6  shadow hover:shadow-md p-3 rounded-md border">
      <h5 className="text-xl font-semibold mb-4">Family Tree</h5>

      {/* Update Family Tree Checkboxes */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="updateFamilyTree"
            checked={safeFormData.updateFamilyTree || false}
            onCheckedChange={(checked) => handleInputChange('updateFamilyTree', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="updateFamilyTree">Update Family Tree</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="updateFamilyTreeforSupervisa"
            checked={safeFormData.updateFamilyTreeforSupervisa || false}
            onCheckedChange={(checked) => handleInputChange('updateFamilyTreeforSupervisa', checked)}
            disabled={isDisabled}
          />
          <Label htmlFor="updateFamilyTreeforSupervisa">Update Family Tree for Supervisa</Label>
        </div>
      </div>

      {/* Relationship Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="relationShipStatus">Relationship Status</Label>
          <Select
            value={safeFormData.relationShipStatus || ''}
            onValueChange={(value) => handleInputChange('relationShipStatus', value)}
            disabled={isDisabled}
          >
              <SelectTrigger className={"w-86"}>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Common Law">Common Law</SelectItem>
              <SelectItem value="Single">Single</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conditional fields for Married */}
      {safeFormData.relationShipStatus === 'Married' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nameOfSpouse">Name of Spouse</Label>
            <Input
              id="nameOfSpouse"
              value={safeFormData.nameOfSpouse || ''}
              onChange={(e) => handleInputChange('nameOfSpouse', e.target.value)}
              disabled={isDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfSpouse">Number of Spouse</Label>
            <Input
              id="numberOfSpouse"
              value={safeFormData.numberOfSpouse || ''}
              onChange={(e) => handleInputChange('numberOfSpouse', e.target.value)}
              disabled={isDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="anniversaryDate">Anniversary Date</Label>
            <Input
              id="anniversaryDate"
              type="date"
              value={safeFormData.anniversaryDate || ''}
              onChange={(e) => handleInputChange('anniversaryDate', e.target.value)}
              disabled={isDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spouseDateOfBirth">Spouse's Date of Birth</Label>
            <Input
              id="spouseDateOfBirth"
              type="date"
              value={safeFormData.spouseDateOfBirth || ''}
              onChange={(e) => handleInputChange('spouseDateOfBirth', e.target.value)}
              disabled={isDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneOfSpouse">Phone of Spouse</Label>
            <Input
              id="phoneOfSpouse"
              value={safeFormData.phoneOfSpouse || ''}
              onChange={(e) => handleInputChange('phoneOfSpouse', e.target.value)}
              disabled={isDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailOfSpouse">Email of Spouse</Label>
            <Input
              id="emailOfSpouse"
              type="email"
              value={safeFormData.emailOfSpouse || ''}
              onChange={(e) => handleInputChange('emailOfSpouse', e.target.value)}
              disabled={isDisabled}
            />
          </div>
        </div>
      )}

      {/* Conditional fields for Common Law */}
      {safeFormData.relationShipStatus === 'Common Law' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nameOfCommonLawPartner">Name of Common Law Partner</Label>
            <Input
              id="nameOfCommonLawPartner"
              value={safeFormData.nameOfCommonLawPartner || ''}
              onChange={(e) => handleInputChange('nameOfCommonLawPartner', e.target.value)}
              disabled={isDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="commonLawDateOfBirth">Common Law Partner's Date of Birth</Label>
            <Input
              id="commonLawDateOfBirth"
              type="date"
              value={safeFormData.commonLawDateOfBirth || ''}
              onChange={(e) => handleInputChange('commonLawDateOfBirth', e.target.value)}
              disabled={isDisabled}
            />
          </div>
        </div>
      )}

      {/* Dependent Parents Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dependentParents">Dependent Parents?</Label>
            <Select
              value={safeFormData.dependentParents || ''}
              onValueChange={(value) => handleInputChange('dependentParents', value)}
              disabled={isDisabled}
            >
              <SelectTrigger className={"w-86"}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {safeFormData.dependentParents === 'Yes' && (
            <div className="space-y-2">
              <Label htmlFor="numberOfDependentParents">Number of Dependent Parents</Label>
              <Input
                id="numberOfDependentParents"
                type="number"
                value={safeFormData.numberOfDependentParents || ''}
                onChange={(e) => handleInputChange('numberOfDependentParents', e.target.value)}
                disabled={isDisabled}
              />
            </div>
          )}
        </div>

        {safeFormData.dependentParents === 'Yes' && dependentParentsData.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Relationship Parent</TableHead>
                  <TableHead>Name Parent</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dependentParentsData.map((parent, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteDependentParentsData(index)}
                        disabled={isDisabled}
                      >
                          < Trash2 size={16} className='cursor-pointer'/>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.relationship || ''}
                        onChange={(e) => {
                          const newData = [...dependentParentsData];
                          newData[index].relationship = e.target.value;
                          setDependentParentsData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.name || ''}
                        onChange={(e) => {
                          const newData = [...dependentParentsData];
                          newData[index].name = e.target.value;
                          setDependentParentsData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={parent.dob || ''}
                        onChange={(e) => {
                          const newData = [...dependentParentsData];
                          newData[index].dob = e.target.value;
                          setDependentParentsData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="email"
                        value={parent.email || ''}
                        onChange={(e) => {
                          const newData = [...dependentParentsData];
                          newData[index].email = e.target.value;
                          setDependentParentsData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.phone || ''}
                        onChange={(e) => {
                          const newData = [...dependentParentsData];
                          newData[index].phone = e.target.value;
                          setDependentParentsData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.age || ''}
                        onChange={(e) => {
                          const newData = [...dependentParentsData];
                          newData[index].age = e.target.value;
                          setDependentParentsData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={addRowToDependentParentsData} disabled={isDisabled}>
              Add Row
            </Button>
          </div>
        )}
      </div>

      {/* Dependent Children Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dependentChildren">Dependent Children?</Label>
            <Select
              value={safeFormData.dependentChildren || ''}
              onValueChange={(value) => handleInputChange('dependentChildren', value)}
              disabled={isDisabled}
            >
<SelectTrigger className={"w-86"}>
                  <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {safeFormData.dependentChildren === 'Yes' && (
            <div className="space-y-2">
              <Label htmlFor="numberOfDependentChildren">Number of Dependent Children</Label>
              <Input
                id="numberOfDependentChildren"
                type="number"
                value={safeFormData.numberOfDependentChildren || ''}
                onChange={(e) => handleInputChange('numberOfDependentChildren', e.target.value)}
                disabled={isDisabled}
              />
            </div>
          )}
        </div>

        {safeFormData.dependentChildren === 'Yes' && dependentChildrenData.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Relationship Child</TableHead>
                  <TableHead>Name Child</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dependentChildrenData.map((child, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteDependentChildrenData(index)}
                        disabled={isDisabled}
                      >
                        <i className="fas fa-trash text-secondary"></i>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={child.relationship || ''}
                        onChange={(e) => {
                          const newData = [...dependentChildrenData];
                          newData[index].relationship = e.target.value;
                          setDependentChildrenData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={child.name || ''}
                        onChange={(e) => {
                          const newData = [...dependentChildrenData];
                          newData[index].name = e.target.value;
                          setDependentChildrenData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={child.dob || ''}
                        onChange={(e) => {
                          const newData = [...dependentChildrenData];
                          newData[index].dob = e.target.value;
                          setDependentChildrenData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="email"
                        value={child.email || ''}
                        onChange={(e) => {
                          const newData = [...dependentChildrenData];
                          newData[index].email = e.target.value;
                          setDependentChildrenData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={child.phone || ''}
                        onChange={(e) => {
                          const newData = [...dependentChildrenData];
                          newData[index].phone = e.target.value;
                          setDependentChildrenData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={child.age || ''}
                        onChange={(e) => {
                          const newData = [...dependentChildrenData];
                          newData[index].age = e.target.value;
                          setDependentChildrenData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={addRowToDependentChildrenData} disabled={isDisabled}>
              Add Row
            </Button>
          </div>
        )}
      </div>

      {/* Siblings Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="siblings">Siblings?</Label>
            <Select
              value={safeFormData.siblings || ''}
              onValueChange={(value) => handleInputChange('siblings', value)}
              disabled={isDisabled}
            >
             <SelectTrigger className={"w-86"}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {safeFormData.siblings === 'Yes' && (
            <div className="space-y-2">
              <Label htmlFor="numberOfSiblings">Number of Siblings</Label>
              <Input
                id="numberOfSiblings"
                type="number"
                value={safeFormData.numberOfSiblings || ''}
                onChange={(e) => handleInputChange('numberOfSiblings', e.target.value)}
                disabled={isDisabled}
              />
            </div>
          )}
        </div>

        {safeFormData.siblings === 'Yes' && siblingData.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Relationship Sibling</TableHead>
                  <TableHead>Name Sibling</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {siblingData.map((sibling, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSiblingData(index)}
                        disabled={isDisabled}
                      >
                          < Trash2 size={16} className='cursor-pointer'/>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={sibling.relationship || ''}
                        onChange={(e) => {
                          const newData = [...siblingData];
                          newData[index].relationship = e.target.value;
                          setSiblingData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={sibling.name || ''}
                        onChange={(e) => {
                          const newData = [...siblingData];
                          newData[index].name = e.target.value;
                          setSiblingData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={sibling.dob || ''}
                        onChange={(e) => {
                          const newData = [...siblingData];
                          newData[index].dob = e.target.value;
                          setSiblingData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="email"
                        value={sibling.email || ''}
                        onChange={(e) => {
                          const newData = [...siblingData];
                          newData[index].email = e.target.value;
                          setSiblingData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={sibling.phone || ''}
                        onChange={(e) => {
                          const newData = [...siblingData];
                          newData[index].phone = e.target.value;
                          setSiblingData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={sibling.age || ''}
                        onChange={(e) => {
                          const newData = [...siblingData];
                          newData[index].age = e.target.value;
                          setSiblingData(newData);
                        }}
                        disabled={isDisabled}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={addRowToSiblingData} disabled={isDisabled}>
              Add Row
            </Button>
          </div>
        )}
      </div>

      {/* Emergency Contact Section */}
      <div className="space-y-4">
        <h5 className="text-lg font-semibold">Emergency Contact <span className="text-red-500">*</span></h5>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Emergency Contact Name</TableHead>
                <TableHead>Emergency Contact Phone</TableHead>
                <TableHead>Emergency Contact Relationship</TableHead>
                <TableHead>Emergency Contact Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emergencyContactData.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEmergencyContact(index)}
                      disabled={isDisabled}
                    >
                        < Trash2 size={16} className='cursor-pointer'/>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={contact.emergencyContactName || ''}
                      onChange={(e) => {
                        const newData = [...emergencyContactData];
                        newData[index].emergencyContactName = e.target.value;
                        setEmergencyContactData(newData);
                      }}
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={contact.emergencyContactPhone || ''}
                      onChange={(e) => {
                        const newData = [...emergencyContactData];
                        newData[index].emergencyContactPhone = e.target.value;
                        setEmergencyContactData(newData);
                      }}
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={contact.emergencyContactRelationship || ''}
                      onChange={(e) => {
                        const newData = [...emergencyContactData];
                        newData[index].emergencyContactRelationship = e.target.value;
                        setEmergencyContactData(newData);
                      }}
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="email"
                      value={contact.emergencyContactEmail || ''}
                      onChange={(e) => {
                        const newData = [...emergencyContactData];
                        newData[index].emergencyContactEmail = e.target.value;
                        setEmergencyContactData(newData);
                      }}
                      disabled={isDisabled}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={addRowToEmergencyContact} disabled={isDisabled}>
            Add Row
          </Button>
        </div>
      </div>
      </div>
     

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={handlePrevious} variant="outline">
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
   
        </>

  );
};

export default FamilyTreeForm;
