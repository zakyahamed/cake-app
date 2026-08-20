import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { LocalStorageProvider } from './providers/local-storage.provider';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  providers: [
    {
      provide: StorageService,
      useClass: LocalStorageProvider,
    },
  ],
  exports: [StorageService],
})
export class StorageModule { }
