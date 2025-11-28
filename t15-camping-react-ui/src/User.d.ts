export interface User {
    user_id: number;
    scout?: boolean;
    first_name?: string;
    last_name?: string;
    email?: string;
    active?: boolean;
    annual_fee?: boolean;
    deleted?: boolean;
    gender?: string;
}

export interface UsersResponse {
    users: User[];
}