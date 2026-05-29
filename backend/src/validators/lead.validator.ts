import { z } from "zod";
import { LeadSource, LeadStatus } from "../constants/leads.js";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid lead id");

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Email must be valid").toLowerCase(),
    status: z.enum([LeadStatus.New, LeadStatus.Contacted, LeadStatus.Qualified, LeadStatus.Lost]).default(LeadStatus.New),
    source: z.enum([LeadSource.Website, LeadSource.Instagram, LeadSource.Referral])
  })
});

export const updateLeadSchema = z.object({
  params: z.object({
    id: objectIdSchema
  }),
  body: z
    .object({
      name: z.string().trim().min(2, "Name must be at least 2 characters").optional(),
      email: z.string().trim().email("Email must be valid").toLowerCase().optional(),
      status: z.enum([LeadStatus.New, LeadStatus.Contacted, LeadStatus.Qualified, LeadStatus.Lost]).optional(),
      source: z.enum([LeadSource.Website, LeadSource.Instagram, LeadSource.Referral]).optional()
    })
    .refine((data) => Object.keys(data).length > 0, "At least one field is required")
});

export const leadIdSchema = z.object({
  params: z.object({
    id: objectIdSchema
  })
});

export const listLeadsSchema = z.object({
  query: z.object({
    status: z.enum([LeadStatus.New, LeadStatus.Contacted, LeadStatus.Qualified, LeadStatus.Lost]).optional(),
    source: z.enum([LeadSource.Website, LeadSource.Instagram, LeadSource.Referral]).optional(),
    search: z.string().trim().optional(),
    sort: z.enum(["latest", "oldest"]).default("latest"),
    page: z.coerce.number().int().positive().default(1)
  })
});
