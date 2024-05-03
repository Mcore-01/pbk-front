export interface IPaginatedData {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    items: any[];
}