import 'multer';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class StorageService {
  /**
   * Uploads a file to the storage provider.
   * @param file The file object (usually from Multer)
   * @param directory The directory path to store the file (e.g., 'businesses/logos')
   * @returns The public URL of the uploaded file
   */
  abstract upload(file: Express.Multer.File, directory: string): Promise<string>;

  /**
   * Deletes a file from the storage provider.
   * @param url The public URL of the file to delete
   */
  abstract delete(url: string): Promise<void>;
}
