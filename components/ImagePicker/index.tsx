import { useActions } from '@/store/useActions';
import React, { FC, Fragment, useEffect, useState } from 'react';
import ImageEditor, { defaultImgOptions, IimgOptions } from './ImageEditor';
import AvatarPlaceholder from '@/images/testio_placeholder.jpg';
import { AnimatePresence } from 'framer-motion';
import { checkIfImage } from '@/utils/imageExtention';
import styles from './imagePicker.module.scss';
import { loadImage } from '@/utils/loadImage';
interface IchildrenProps {
  setShowAvatarPicker: React.Dispatch<React.SetStateAction<boolean>>;
  triggerInput: () => void;
  resetImage: () => void;
  avatar: string;
}

interface IImagePicker {
  children: (args: IchildrenProps) => React.ReactNode;
  initialImage?: any;
  getImage?: (image: string) => void;
}

const ImagePicker: FC<IImagePicker> = ({
  children,
  initialImage = AvatarPlaceholder.src,
  getImage = () => {},
}) => {
  const { setMessage } = useActions();

  let imageUpload: any;
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [originalImage, setOriginalImage] = useState<string>(initialImage);
  const [imgOptions, setImageoptions] =
    useState<IimgOptions>(defaultImgOptions);
  const [avatar, setAvatar] = useState<string>(initialImage);
  const triggerInput = () => {
    imageUpload?.click();
  };

  const resetImage = () => {
    setAvatar(initialImage);
    setOriginalImage(initialImage);
    setImageoptions(defaultImgOptions);
  };
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    loadImage(initialImage, (img) => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx: CanvasRenderingContext2D = canvas.getContext(
        '2d'
      ) as CanvasRenderingContext2D;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const newImage = canvas.toDataURL();
      setOriginalImage(newImage);
    });
    return () => {
      canvas.remove();
    };
  }, []);
  // Note that children is called as a function and we can pass args to it.
  return (
    <Fragment>
      <input
        className={styles.file__input}
        ref={(upload) => (imageUpload = upload)}
        id='avatar'
        type='file'
        accept='image/*'
        onChange={(e) => {
          if (e.target?.files?.length) {
            if (!checkIfImage(e.target.value)) {
              setMessage({
                type: 'warning',
                msg: 'Only .jpg, .jpeg, .png, .gif files allowed',
              });
              return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
              setMessage({
                type: 'info',
                msg: 'Successful image upload',
              });
              const img = reader.result?.toString() as string;
              setOriginalImage(img);
              setAvatar(img);
              setImageoptions(defaultImgOptions);
              setShowAvatarPicker(true);
            };
            reader.readAsDataURL(e.target?.files[0]);
            reader.onerror = () => {
              setMessage({
                type: 'error',
                msg: 'FileReader error occured',
              });
            };
          }
        }}
      />
      <AnimatePresence exitBeforeEnter>
        {showAvatarPicker && (
          <ImageEditor
            image={originalImage as string}
            getImage={(image) => {
              setAvatar(image);
              getImage(image);
            }}
            getOptions={setImageoptions}
            imgOptions={imgOptions}
            closePicker={() => setShowAvatarPicker(false)}
          />
        )}
      </AnimatePresence>
      {children({ setShowAvatarPicker, triggerInput, resetImage, avatar })}
    </Fragment>
  );
};

export default ImagePicker;
