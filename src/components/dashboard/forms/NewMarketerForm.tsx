import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MarketerService } from "@/services/marketer";
import { ProjectsService } from "@/services/projectsService";

interface NewMarketerFormProps {
  onClose?: () => void;
  onSubmit?: (data: any) => void;
}

interface MarketerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  commissionType: string;
  commissionRate: string;
  fixedAmount: string;
  tier1Rate: string;
  tier2Rate: string;
  notes: string;
  startDate: string;
}

export function NewMarketerForm({ onClose, onSubmit }: NewMarketerFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [formData, setFormData] = useState<MarketerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    status: "active",
    commissionType: "percentage",
    commissionRate: "",
    fixedAmount: "",
    tier1Rate: "",
    tier2Rate: "",
    notes: "",
    startDate: "",
  });
  const [errors, setErrors] = useState<Partial<MarketerFormData>>({});
  const [availableProjects, setAvailableProjects] = useState<string[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Replace with your actual API call
        const response = await ProjectsService.getProjects();
        const projectNames = response.data.data.map(
          (project: any) => project.projectName
        );
        setAvailableProjects(projectNames);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback to mock data if API fails
        setAvailableProjects([
          "Victoria Gardens",
          "Emerald Heights",
          "Golden View",
          "Sunset Residences",
          "Royal Palm Estate",
        ]);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (field: keyof MarketerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleProjectToggle = (project: string) => {
    setSelectedProjects((prev) =>
      prev.includes(project)
        ? prev.filter((p) => p !== project)
        : [...prev, project]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<MarketerFormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.role) newErrors.role = "Role is required";

    // Commission structure validation
    if (formData.commissionType === "percentage" && !formData.commissionRate) {
      newErrors.commissionRate = "Commission rate is required";
    }
    if (formData.commissionType === "fixed" && !formData.fixedAmount) {
      newErrors.fixedAmount = "Fixed amount is required";
    }
    if (
      formData.commissionType === "tiered" &&
      (!formData.tier1Rate || !formData.tier2Rate)
    ) {
      newErrors.tier1Rate = "Tier rates are required";
      newErrors.tier2Rate = "Tier rates are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!validateForm()) {
        toast({
          title: "Validation Error",
          description: "Please fix the errors in the form before submitting.",
          variant: "destructive",
        });
        return;
      }

      if (selectedProjects.length === 0) {
        toast({
          title: "No Projects Selected",
          description: "Please select at least one project for this marketer.",
          variant: "destructive",
        });
        return;
      }

      const response = await MarketerService.createMarketer({
        ...formData,
        projects: selectedProjects,
      });
      console.log("Creating new marketer:", response);
    } catch (error) {
      console.error("Error creating marketer:", error);
      toast({
        title: "Error Creating Marketer",
        description: "An error occurred while creating the marketer.",
        variant: "destructive",
      });
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    if (onClose) {
      // onClose();
    } else {
      // navigate("/company/marketers");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-left">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-left block text-sm font-medium"
              >
                First Name *
              </Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-left block text-sm font-medium"
              >
                Last Name *
              </Label>
              <Input
                id="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-left block text-sm font-medium"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-left block text-sm font-medium"
              >
                Phone Number *
              </Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="role"
              className="text-left block text-sm font-medium"
            >
              Role *
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketer">External Marketer</SelectItem>
                <SelectItem value="sales-agent">
                  Internal Sales Agent
                </SelectItem>
                <SelectItem value="senior-marketer">Senior Marketer</SelectItem>
                <SelectItem value="team-lead">Marketing Team Lead</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role}</p>
            )}
          </div>
        </div>

        {/* Project Assignment */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-left">Project Assignment</h3>
          <div className="space-y-2">
            <Label className="text-left block text-sm font-medium">
              Assigned Projects *
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {availableProjects.map((project) => (
                <div key={project} className="flex items-center space-x-2">
                  <Checkbox
                    id={project}
                    checked={selectedProjects.includes(project)}
                    onCheckedChange={() => handleProjectToggle(project)}
                  />
                  <Label htmlFor={project} className="text-sm">
                    {project}
                  </Label>
                </div>
              ))}
            </div>
            {selectedProjects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedProjects.map((project) => (
                  <Badge
                    key={project}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {project}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleProjectToggle(project)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Commission Structure */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-left">
            Commission Structure
          </h3>

          <div className="space-y-2">
            <Label className="text-left block text-sm font-medium">
              Commission Type
            </Label>
            <Select
              value={formData.commissionType}
              onValueChange={(value) =>
                handleInputChange("commissionType", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage of Sale</SelectItem>
                <SelectItem value="fixed">Fixed Amount per Unit</SelectItem>
                <SelectItem value="tiered">Tiered Commission</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.commissionType === "percentage" && (
            <div className="space-y-2">
              <Label
                htmlFor="commissionRate"
                className="text-left block text-sm font-medium"
              >
                Commission Rate (%) *
              </Label>
              <Input
                id="commissionRate"
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="e.g., 2.5"
                value={formData.commissionRate}
                onChange={(e) =>
                  handleInputChange("commissionRate", e.target.value)
                }
                className={errors.commissionRate ? "border-red-500" : ""}
              />
              {errors.commissionRate && (
                <p className="text-sm text-red-500">{errors.commissionRate}</p>
              )}
            </div>
          )}

          {formData.commissionType === "fixed" && (
            <div className="space-y-2">
              <Label
                htmlFor="fixedAmount"
                className="text-left block text-sm font-medium"
              >
                Fixed Amount (₦) *
              </Label>
              <Input
                id="fixedAmount"
                type="number"
                min="0"
                placeholder="e.g., 500000"
                value={formData.fixedAmount}
                onChange={(e) =>
                  handleInputChange("fixedAmount", e.target.value)
                }
                className={errors.fixedAmount ? "border-red-500" : ""}
              />
              {errors.fixedAmount && (
                <p className="text-sm text-red-500">{errors.fixedAmount}</p>
              )}
            </div>
          )}

          {formData.commissionType === "tiered" && (
            <div className="space-y-2">
              <Label className="text-left block text-sm font-medium">
                Tiered Structure
              </Label>
              <div className="text-sm text-gray-500 mb-2">
                Configure tiered commission rates based on sales volume
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="tier1"
                    className="text-left block text-sm font-medium"
                  >
                    First 5 sales (%) *
                  </Label>
                  <Input
                    id="tier1"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 2.0"
                    value={formData.tier1Rate}
                    onChange={(e) =>
                      handleInputChange("tier1Rate", e.target.value)
                    }
                    className={errors.tier1Rate ? "border-red-500" : ""}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="tier2"
                    className="text-left block text-sm font-medium"
                  >
                    Next 10 sales (%) *
                  </Label>
                  <Input
                    id="tier2"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 2.5"
                    value={formData.tier2Rate}
                    onChange={(e) =>
                      handleInputChange("tier2Rate", e.target.value)
                    }
                    className={errors.tier2Rate ? "border-red-500" : ""}
                  />
                </div>
              </div>
              {(errors.tier1Rate || errors.tier2Rate) && (
                <p className="text-sm text-red-500">
                  Both tier rates are required
                </p>
              )}
            </div>
          )}
        </div>

        {/* Additional Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-left">Additional Details</h3>

          <div className="space-y-2">
            <Label
              htmlFor="notes"
              className="text-left block text-sm font-medium"
            >
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes or special instructions..."
              rows={3}
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="startDate"
              className="text-left block text-sm font-medium"
            >
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose || (() => navigate("/company/marketers"))}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Create Marketer
          </Button>
        </div>
      </form>
    </div>
  );
}
