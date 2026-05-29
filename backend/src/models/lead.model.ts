import { Schema, model, type HydratedDocument, type InferSchemaType } from "mongoose";
import { LeadSource, LeadStatus } from "../constants/leads.js";

const leadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.New
    },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: true
    }
  },
  {
    timestamps: true
  }
);

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ createdAt: -1 });

export type Lead = InferSchemaType<typeof leadSchema>;
export type LeadDocument = HydratedDocument<Lead>;
export const LeadModel = model<Lead>("Lead", leadSchema);

