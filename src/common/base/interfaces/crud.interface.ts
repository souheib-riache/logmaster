export interface CRUD<T> {
    create(input: any): Promise<T>;
    getAll(): Promise<T[]>;
    getOneById(id: number | string): Promise<T>;
    update(id: number | string, input: any): Promise<T>;
    delete(id: number | string): Promise<boolean>;
}
