import React, { useState, useEffect } from "react";
import { FormCard, FormField } from "@/components/custom/CustomFormComponents";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { choice } from "../utils/picklist.js";

const FamilyTree = ({ formData, setFormData, isDisabled }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const [depParentSubform, setDepParentSubform] = useState(formData.dependentParentsData || []);
  const [depChildSubform, setDepChildSubform] = useState(formData.dependentChildrenData || []);
  const [siblingSubform, setSiblingSubform] = useState(formData.siblingData || []);
  const [emgContactSubform, setEmgContactSubform] = useState(formData.emergencyContactData || []);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      dependentParentsData: depParentSubform,
      dependentChildrenData: depChildSubform,
      siblingData: siblingSubform,
      emergencyContactData: emgContactSubform,
    }));
  }, [depParentSubform, depChildSubform, siblingSubform, emgContactSubform]);

  const addSubformRow = (type) => {
    if (isDisabled) return;
    const newRow = {
      relationship: "",
      name: "",
      email: "",
      phone: "",
      dob: "",
      age: "",
    };
    if (type === "dependentParents") {
      setDepParentSubform([...depParentSubform, newRow]);
    } else if (type === "dependentChildren") {
      setDepChildSubform([...depChildSubform, newRow]);
    } else if (type === "siblings") {
      setSiblingSubform([...siblingSubform, newRow]);
    } else if (type === "emergencyContacts") {
      setEmgContactSubform([...emgContactSubform, {
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelationship: "",
        emergencyContactEmail: "",
      }]);
    }
  };

  const removeSubformRow = (type, index) => {
    if (isDisabled) return;
    if (type === "dependentParents") {
      setDepParentSubform(depParentSubform.filter((_, i) => i !== index));
    } else if (type === "dependentChildren") {
      setDepChildSubform(depChildSubform.filter((_, i) => i !== index));
    } else if (type === "siblings") {
      setSiblingSubform(siblingSubform.filter((_, i) => i !== index));
    } else if (type === "emergencyContacts") {
      setEmgContactSubform(emgContactSubform.filter((_, i) => i !== index));
    }
  };

  const updateSubformRow = (type, index, field, value) => {
    if (isDisabled) return;
    if (type === "dependentParents") {
      const updated = [...depParentSubform];
      updated[index][field] = value;
      setDepParentSubform(updated);
    } else if (type === "dependentChildren") {
      const updated = [...depChildSubform];
      updated[index][field] = value;
      setDepChildSubform(updated);
    } else if (type === "siblings") {
      const updated = [...siblingSubform];
      updated[index][field] = value;
      setSiblingSubform(updated);
    } else if (type === "emergencyContacts") {
      const updated = [...emgContactSubform];
      updated[index][field] = value;
      setEmgContactSubform(updated);
    }
  };

  return (
    <div>
      <FormCard title="Family Tree">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Relationship Status">
            <Select
              value={formData.relationShipStatus || ""}
              onValueChange={(value) => handleChange("relationShipStatus", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single" disabled={isDisabled}>Single</SelectItem>
                <SelectItem value="Married" disabled={isDisabled}>Married</SelectItem>
                <SelectItem value="Common Law" disabled={isDisabled}>Common Law</SelectItem>
                <SelectItem value="Divorced" disabled={isDisabled}>Divorced</SelectItem>
                <SelectItem value="Widowed" disabled={isDisabled}>Widowed</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>

        {formData.relationShipStatus === "Married" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <FormField label="Name of Spouse">
              <Input
                value={formData.nameOfSpouse || ""}
                onChange={(e) => handleChange("nameOfSpouse", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
            <FormField label="Number of Spouse">
              <Input
                value={formData.numberOfSpouse || ""}
                onChange={(e) => handleChange("numberOfSpouse", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
            <FormField label="Anniversary Date">
              <Input
                type="date"
                value={formData.anniversaryDate || ""}
                onChange={(e) => handleChange("anniversaryDate", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
            <FormField label="Spouse's Date of Birth">
              <Input
                type="date"
                value={formData.spouseDateOfBirth || ""}
                onChange={(e) => handleChange("spouseDateOfBirth", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
            <FormField label="Phone of Spouse">
              <Input
                value={formData.phoneOfSpouse || ""}
                onChange={(e) => handleChange("phoneOfSpouse", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
            <FormField label="Email of Spouse">
              <Input
                type="email"
                value={formData.emailOfSpouse || ""}
                onChange={(e) => handleChange("emailOfSpouse", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
          </div>
        )}

        {formData.relationShipStatus === "Common Law" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField label="Name of Common Law Partner">
              <Input
                value={formData.nameOfCommonLawPartner || ""}
                onChange={(e) => handleChange("nameOfCommonLawPartner", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
            <FormField label="Common Law Partner's Date of Birth">
              <Input
                type="date"
                value={formData.commonLawDateOfBirth || ""}
                onChange={(e) => handleChange("commonLawDateOfBirth", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
          </div>
        )}
      </FormCard>

      <FormCard title="Dependent Parents">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Dependent Parents?">
            <Select
              value={formData.dependentParents || ""}
              onValueChange={(value) => handleChange("dependentParents", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {choice.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          {formData.dependentParents === "Yes" && (
            <FormField label="Number of Dependent Parents">
              <Input
                type="number"
                value={formData.numberOfDependentParents || ""}
                onChange={(e) => handleChange("numberOfDependentParents", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
          )}
        </div>
        {formData.dependentParents === "Yes" && depParentSubform.length > 0 && (
          <div className="mt-4 overflow-x-auto">
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
                {depParentSubform.map((parent, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubformRow("dependentParents", index)}
                        disabled={isDisabled}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.relationship || ""}
                        onChange={(e) => updateSubformRow("dependentParents", index, "relationship", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.name || ""}
                        onChange={(e) => updateSubformRow("dependentParents", index, "name", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={parent.dob || ""}
                        onChange={(e) => updateSubformRow("dependentParents", index, "dob", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="email"
                        value={parent.email || ""}
                        onChange={(e) => updateSubformRow("dependentParents", index, "email", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.phone || ""}
                        onChange={(e) => updateSubformRow("dependentParents", index, "phone", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={parent.age || ""}
                        onChange={(e) => updateSubformRow("dependentParents", index, "age", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              className="mt-2"
              onClick={() => addSubformRow("dependentParents")}
              disabled={isDisabled}
            >
              Add Row
            </Button>
          </div>
        )}
      </FormCard>

      <FormCard title="Dependent Children">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Dependent Children?">
            <Select
              value={formData.dependentChildren || ""}
              onValueChange={(value) => handleChange("dependentChildren", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {choice.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          {formData.dependentChildren === "Yes" && (
            <FormField label="Number of Dependent Children">
              <Input
                type="number"
                value={formData.numberOfDependentChildren || ""}
                onChange={(e) => handleChange("numberOfDependentChildren", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
          )}
        </div>
        {formData.dependentChildren === "Yes" && depChildSubform.length > 0 && (
          <div className="mt-4 overflow-x-auto">
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
                {depChildSubform.map((child, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubformRow("dependentChildren", index)}
                        disabled={isDisabled}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={child.relationship || ""}
                        onChange={(e) => updateSubformRow("dependentChildren", index, "relationship", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={child.name || ""}
                        onChange={(e) => updateSubformRow("dependentChildren", index, "name", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={child.dob || ""}
                        onChange={(e) => updateSubformRow("dependentChildren", index, "dob", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="email"
                        value={child.email || ""}
                        onChange={(e) => updateSubformRow("dependentChildren", index, "email", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={child.phone || ""}
                        onChange={(e) => updateSubformRow("dependentChildren", index, "phone", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={child.age || ""}
                        onChange={(e) => updateSubformRow("dependentChildren", index, "age", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              className="mt-2"
              onClick={() => addSubformRow("dependentChildren")}
              disabled={isDisabled}
            >
              Add Row
            </Button>
          </div>
        )}
      </FormCard>

      <FormCard title="Siblings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Siblings?">
            <Select
              value={formData.siblings || ""}
              onValueChange={(value) => handleChange("siblings", value)}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-full" disabled={isDisabled}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {choice.map((option) => (
                  <SelectItem key={option} value={option} disabled={isDisabled}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          {formData.siblings === "Yes" && (
            <FormField label="Number of Siblings">
              <Input
                type="number"
                value={formData.numberOfSiblings || ""}
                onChange={(e) => handleChange("numberOfSiblings", e.target.value)}
                disabled={isDisabled}
              />
            </FormField>
          )}
        </div>
        {formData.siblings === "Yes" && siblingSubform.length > 0 && (
          <div className="mt-4 overflow-x-auto">
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
                {siblingSubform.map((sibling, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubformRow("siblings", index)}
                        disabled={isDisabled}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={sibling.relationship || ""}
                        onChange={(e) => updateSubformRow("siblings", index, "relationship", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={sibling.name || ""}
                        onChange={(e) => updateSubformRow("siblings", index, "name", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={sibling.dob || ""}
                        onChange={(e) => updateSubformRow("siblings", index, "dob", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="email"
                        value={sibling.email || ""}
                        onChange={(e) => updateSubformRow("siblings", index, "email", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={sibling.phone || ""}
                        onChange={(e) => updateSubformRow("siblings", index, "phone", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={sibling.age || ""}
                        onChange={(e) => updateSubformRow("siblings", index, "age", e.target.value)}
                        disabled={isDisabled}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              className="mt-2"
              onClick={() => addSubformRow("siblings")}
              disabled={isDisabled}
            >
              Add Row
            </Button>
          </div>
        )}
      </FormCard>

      <FormCard title="Emergency Contact">
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
              {emgContactSubform.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubformRow("emergencyContacts", index)}
                      disabled={isDisabled}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={contact.emergencyContactName || ""}
                      onChange={(e) => updateSubformRow("emergencyContacts", index, "emergencyContactName", e.target.value)}
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={contact.emergencyContactPhone || ""}
                      onChange={(e) => updateSubformRow("emergencyContacts", index, "emergencyContactPhone", e.target.value)}
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={contact.emergencyContactRelationship || ""}
                      onChange={(e) => updateSubformRow("emergencyContacts", index, "emergencyContactRelationship", e.target.value)}
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="email"
                      value={contact.emergencyContactEmail || ""}
                      onChange={(e) => updateSubformRow("emergencyContacts", index, "emergencyContactEmail", e.target.value)}
                      disabled={isDisabled}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            className="mt-2"
            onClick={() => addSubformRow("emergencyContacts")}
            disabled={isDisabled}
          >
            Add Row
          </Button>
        </div>
      </FormCard>
    </div>
  );
};

export default FamilyTree;
