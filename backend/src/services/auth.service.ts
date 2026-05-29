import { UserRole } from "../constants/roles.js";
import { UserModel, type UserDocument } from "../models/user.model.js";
import type { AuthResponse, AuthUser, LoginDto, RegisterDto } from "../types/auth.types.js";
import { ApiError } from "../utils/api-error.js";
import { signAccessToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

function toAuthUser(user: UserDocument): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

function buildAuthResponse(user: UserDocument): AuthResponse {
  return {
    user: toAuthUser(user),
    token: signAccessToken({
      sub: user.id,
      role: user.role
    })
  };
}

export const authService = {
  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await UserModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new ApiError(409, "Email is already registered");
    }

    const user = await UserModel.create({
      name: dto.name,
      email: dto.email,
      passwordHash: await hashPassword(dto.password),
      role: dto.role ?? UserRole.SalesUser
    });

    return buildAuthResponse(user);
  },

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email: dto.email });
    if (!user || !user.isActive) {
      throw new ApiError(401, "Invalid email or password");
    }

    const passwordMatches = await comparePassword(dto.password, user.passwordHash);
    if (!passwordMatches) {
      throw new ApiError(401, "Invalid email or password");
    }

    return buildAuthResponse(user);
  },

  async getCurrentUser(userId: string): Promise<AuthUser> {
    const user = await UserModel.findById(userId);
    if (!user || !user.isActive) {
      throw new ApiError(404, "User not found");
    }

    return toAuthUser(user);
  }
};

