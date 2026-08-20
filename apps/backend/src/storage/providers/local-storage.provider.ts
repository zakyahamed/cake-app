import 'multer';
import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from '../storage.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class LocalStorageProvider implements StorageService {
  private readonly logger = new Logger(LocalStorageProvider.name);
  private readonly uploadDir = path.join(process.cwd(), 'uploads');
  private readonly baseUrl = 'http://localhost:3001/uploads'; // Ideally from ConfigService

  constructor() {
    this.init();
  }

  private async init() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (err) {
      this.logger.error('Failed to create upload directory', err);
    }
  }

  async upload(file: Express.Multer.File, directory: string): Promise<string> {
    const filename = `${crypto.randomUUID()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const targetDir = path.join(this.uploadDir, directory);
    
    await fs.mkdir(targetDir, { recursive: true });
    
    const filePath = path.join(targetDir, filename);
    await fs.writeFile(filePath, file.buffer);
    
    return `${this.baseUrl}/${directory}/${filename}`;
  }

  async delete(url: string): Promise<void> {
    try {
      if (!url.startsWith(this.baseUrl)) {
        this.logger.warn(`Cannot delete file outside of local storage: ${url}`);
        return;
      }

      const relativePath = url.replace(`${this.baseUrl}/`, '');
      const filePath = path.join(this.uploadDir, relativePath);
      
      await fs.unlink(filePath);
    } catch (error) {
      this.logger.error(`Failed to delete file at ${url}`, error);
    }
  }
}
