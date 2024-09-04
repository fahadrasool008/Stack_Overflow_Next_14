// Assuming BADGE_CRITERIA is exported from "@/constants"
import { BADGE_CRITERIA } from "@/constants";

// Define objects with required properties as JavaScript objects

// Example object for SidebarLink
const exampleSidebarLink = {
  imgURL: "",
  route: "",
  label: "",
};

// Example object for Job
const exampleJob = {
  id: "",
  employer_name: "",
  employer_logo: undefined,
  employer_website: "",
  job_employment_type: "",
  job_title: "",
  job_description: "",
  job_apply_link: "",
  job_city: "",
  job_state: "",
  job_country: "",
};

// Example object for Country
const exampleCountry = {
  name: {
    common: "",
  },
};

// Example object for ParamsProps
const exampleParamsProps = {
  params: { id: "" },
};

// Example object for SearchParamsProps
const exampleSearchParamsProps = {
  searchParams: {}, // You may need to validate the content of this object
};

// Example object for URLProps
const exampleURLProps = {
  params: { id: "" },
  searchParams: {}, // You may need to validate the content of this object
};

// Example object for BadgeCounts
const exampleBadgeCounts = {
  GOLD: 0,
  SILVER: 0,
  BRONZE: 0,
};

// Example of how to handle BadgeCriteriaType
// This variable can hold keys from the BADGE_CRITERIA object
const exampleBadgeCriteriaType = "GOLD"; // Ensure this key exists in BADGE_CRITERIA
