import { User } from "../models/user.model";

export interface UsersResponse {
  ok: boolean;
  users: User[];
  total: number;
}