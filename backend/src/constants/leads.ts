export const LeadStatus = {
  New: "NEW",
  Contacted: "CONTACTED",
  Qualified: "QUALIFIED",
  Lost: "LOST"
} as const;

export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export const LeadSource = {
  Website: "WEBSITE",
  Instagram: "INSTAGRAM",
  Referral: "REFERRAL"
} as const;

export type LeadSource = (typeof LeadSource)[keyof typeof LeadSource];

