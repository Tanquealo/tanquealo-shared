/**
 * Standard API response format
 */
export interface APIResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Array<{
        field?: string;
        message: string;
    }>;
}
/**
 * Pagination metadata
 */
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends APIResponse {
    data: T[];
    meta: PaginationMeta;
}
/**
 * Geographic coordinates
 */
export interface Coordinates {
    latitude: number;
    longitude: number;
}
/**
 * Location with address
 */
export interface Location extends Coordinates {
    address?: string;
    city?: string;
    state?: string;
}
//# sourceMappingURL=api.d.ts.map