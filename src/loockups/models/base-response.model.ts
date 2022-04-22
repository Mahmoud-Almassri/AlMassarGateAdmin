export class BaseResponse<T> {
    public entities: T[];
    public totalCount: number;
}
