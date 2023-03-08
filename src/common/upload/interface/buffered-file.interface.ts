import { MimeType } from "../types/mime.type";

/**
 * @description file interface form multer
 *
 * @export
 * @interface BufferedFile
 * @typedef {BufferedFile}
 */
export interface BufferedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: MimeType;
    size: number;
    buffer: Buffer | string;
}