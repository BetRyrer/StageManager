import api from "../../../api/axios";
import type { LoginPayload, LoginResponse } from "../types/auth";

export const authService = {
    async login(payload: LoginPayload): Promise<LoginResponse> {
        const res = await api.post<LoginResponse>("/login", payload);
        return res.data;
    },
};