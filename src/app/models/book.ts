export interface Book {
    book_id: number;
    title: string;
    author: string;
    genre: string;
    lease_expiration_date?: string;
    current_owner?: string;
    qrcode: string;
    library_id: any;
}