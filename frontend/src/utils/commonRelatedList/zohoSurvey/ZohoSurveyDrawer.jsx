import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ZohoSurveyDrawer = ({ isOpen, onClose }) => {
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [surveyLink, setSurveyLink] = useState("");
  const [textToDisplay, setTextToDisplay] = useState("");

  const handleSubmit = () => {
    // Handle submit logic here
    console.log("Submit survey:", {
      selectedSurvey,
      surveyLink,
      textToDisplay,
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md">
        <div className="px-3 py-1">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fa fa-arrow-right cursor-pointer"></i>
          </button>
        </div>
        {/* Survey Form */}
        <div className="message-details p-1">
          <div className="p-5">
            <div className="text-start">
              <form className="card-body pt-1">
                <div className="form-group mb-4">
                  <label
                    htmlFor="surveySelect"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select the Survey
                  </label>
                  <Select
                    value={selectedSurvey}
                    onValueChange={setSelectedSurvey}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a survey" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="survey1">Survey 1</SelectItem>
                      <SelectItem value="survey2">Survey 2</SelectItem>
                      <SelectItem value="survey3">Survey 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="surveyLink"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Survey Link
                  </label>
                  <Input
                    type="text"
                    id="surveyLink"
                    value={surveyLink}
                    onChange={(e) => setSurveyLink(e.target.value)}
                    disabled
                    placeholder="Survey link"
                    className="w-full"
                  />
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="textToDisplay"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Text To Display (Optional)
                  </label>
                  <Input
                    type="text"
                    id="textToDisplay"
                    value={textToDisplay}
                    onChange={(e) => setTextToDisplay(e.target.value)}
                    placeholder="Enter text to display"
                    className="w-full"
                  />
                </div>
                <div className="  w-full mt-4 mx-auto ml-15   fixed bottom-0 bg-white p-4">
                  
                    <Button
                      onClick={handleSubmit}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="destructive"
                      className={"ml-5"}
                    >
                      Cancel
                    </Button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Survey Form ends */}
      </SheetContent>
    </Sheet>
  );
};

export default ZohoSurveyDrawer;
