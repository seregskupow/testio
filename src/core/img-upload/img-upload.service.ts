import { Inject, Injectable } from '@nestjs/common';
import { IMG_UPLOADER } from '../constants';
import { UploaderType } from './types';

@Injectable()
export class ImgUploadService {
  constructor(
    @Inject(IMG_UPLOADER) private readonly uploader: typeof UploaderType,
  ) {}

  private uploadImg(dataUri: string, folder: string) {
    return new Promise((resolve, reject) => {
      this.uploader.upload(
        dataUri,
        {
          folder: `testio/${folder}`,
          use_filename: true,
          transformation: {
            width: 384,
            height: 384,
            crop: 'fill',
          },
        },
        (err, url) => {
          if (err) return reject(err);
          return resolve(url);
        },
      );
    });
  }

  public uploadAvatar(dataUri: string) {
    return this.uploadImg(dataUri, 'avatars');
  }
}
