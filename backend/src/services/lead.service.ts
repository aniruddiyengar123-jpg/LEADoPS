import type { FilterQuery } from "mongoose";
import { LeadModel, type LeadDocument } from "../models/lead.model.js";
import type {
  CreateLeadDto,
  LeadQueryDto,
  LeadResponse,
  PaginatedLeadsResponse,
  UpdateLeadDto
} from "../types/lead.types.js";
import { ApiError } from "../utils/api-error.js";

const LEADS_PER_PAGE = 10;

function toLeadResponse(lead: LeadDocument): LeadResponse {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    createdAt: lead.createdAt
  };
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const leadService = {
  async create(dto: CreateLeadDto): Promise<LeadResponse> {
    const lead = await LeadModel.create(dto);
    return toLeadResponse(lead);
  },

  async getAll(queryDto: LeadQueryDto): Promise<PaginatedLeadsResponse> {
    const page = queryDto.page ?? 1;
    const skip = (page - 1) * LEADS_PER_PAGE;
    const filter: FilterQuery<LeadDocument> = {};

    if (queryDto.status) {
      filter.status = queryDto.status;
    }

    if (queryDto.source) {
      filter.source = queryDto.source;
    }

    if (queryDto.search) {
      const searchRegex = new RegExp(escapeRegex(queryDto.search), "i");
      filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    const sortDirection = queryDto.sort === "oldest" ? 1 : -1;
    const [leads, totalItems] = await Promise.all([
      LeadModel.find(filter).sort({ createdAt: sortDirection }).skip(skip).limit(LEADS_PER_PAGE),
      LeadModel.countDocuments(filter)
    ]);

    return {
      data: leads.map(toLeadResponse),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / LEADS_PER_PAGE),
        totalItems
      }
    };
  },

  async getById(id: string): Promise<LeadResponse> {
    const lead = await LeadModel.findById(id);
    if (!lead) {
      throw new ApiError(404, "Lead not found");
    }

    return toLeadResponse(lead);
  },

  async update(id: string, dto: UpdateLeadDto): Promise<LeadResponse> {
    const lead = await LeadModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true
    });

    if (!lead) {
      throw new ApiError(404, "Lead not found");
    }

    return toLeadResponse(lead);
  },

  async delete(id: string): Promise<{ id: string }> {
    const lead = await LeadModel.findByIdAndDelete(id);
    if (!lead) {
      throw new ApiError(404, "Lead not found");
    }

    return { id };
  }
};
