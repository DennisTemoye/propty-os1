import { z } from "zod";

export const clientFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  otherName: z.string().optional(),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
  nationality: z.string().optional(),
  occupation: z.string().optional(),
  employerBusiness: z.string().optional(),

  // Contact Information
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),

  // Identification
  idType: z.string().optional(),
  nationalId: z.string().optional(),

  // Residential Address
  address: z.string().min(1, "Address is required"),
  city: z.string().optional(),
  state: z.string().optional(),

  // Next of Kin Information
  nextOfKinName: z.string().optional(),
  nextOfKinRelationship: z.string().optional(),
  nextOfKinAddress: z.string().optional(),
  nextOfKinEmail: z
    .string()
    .email("Invalid email format")
    .optional()
    .or(z.literal("")),
  nextOfKinPhone: z.string().optional(),

  // Client Details
  clientType: z.string().optional(),
  referralSource: z.string().optional(),
  notes: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientFormSchema>;

export const referralSourceOptions = [
  { value: "Social Media", label: "Social Media" },
  { value: "Website", label: "Website" },
  { value: "Referral", label: "Referral" },
  { value: "Advertisement", label: "Advertisement" },
  { value: "Walk-in", label: "Walk-in" },
  { value: "Other", label: "Other" },
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];

export const idTypeOptions = [
  { value: "nationalId", label: "National ID Card" },
  { value: "passport", label: "International Passport" },
  { value: "driversLicense", label: "Driver's License" },
  { value: "voterCard", label: "Voter's Card" },
];

export const relationshipOptions = [
  { value: "spouse", label: "Spouse" },
  { value: "parent", label: "Parent" },
  { value: "child", label: "Child" },
  { value: "sibling", label: "Sibling" },
  { value: "friend", label: "Friend" },
  { value: "other", label: "Other" },
];
