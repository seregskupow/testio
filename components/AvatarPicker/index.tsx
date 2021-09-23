import styles from './avatarPicker.module.scss';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Button from '../Controls/Button';
import AvatarPlaceholder from '@/images/testio_placeholder.jpg';
import { motion } from 'framer-motion';
import Panel from '../Panel';
import { disableScrolling, enableScrolling } from '@/utils/windowScroll';

export interface IimgOptions {
  scale: number;
  rotate: number;
  position: {
    x: number;
    y: number;
  };
}
export const defaultImgOptions = {
  scale: 1,
  rotate: 0,
  position: {
    x: 0.5,
    y: 0.5,
  },
};

interface IAvatarPicker {
  image: string;
  getImage: (image: string) => void;
  getOptions?: (imgOptions: IimgOptions) => void;
  closePicker?: () => void;
  imgOptions?: IimgOptions;
}
const variantsPicker = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};
const variantsBg = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AvatarPicker: FC<IAvatarPicker> = ({
  image,
  getImage,
  getOptions = () => {},
  closePicker = () => {},
  imgOptions = defaultImgOptions,
}) => {
  let Editor: any;
  const [scale, setScale] = useState<number>(imgOptions.scale);
  const [rotate, setRotate] = useState<number>(imgOptions.rotate);
  const [position, setPosition] = useState(imgOptions.position);
  useEffect(() => {
    disableScrolling();
    return () => {
      enableScrolling();
    };
  }, []);
  return (
    <div className={styles.avatar__picker__container}>
      <motion.div
        key='picker_bg'
        variants={variantsBg}
        initial='initial'
        animate='animate'
        exit='exit'
        className={styles.avatar__picker__bg}
        onClick={() => closePicker()}
      ></motion.div>
      <motion.div
        key='picker'
        variants={variantsPicker}
        initial='initial'
        animate='animate'
        exit='exit'
        className={styles.avatar__picker}
      >
        <Panel>
          <div className={styles.avatar__picker__inner}>
            <AvatarEditor
              ref={(editor) => (Editor = editor)}
              image={image}
              width={384}
              height={384}
              border={10}
              scale={scale}
              rotate={rotate}
              position={position}
              borderRadius={5}
              onPositionChange={(pos) => {
                setPosition(pos);
              }}
            />
            <div className={styles.avatar__settings}>
              {/* Scale */}
              <Fragment>
                <div className={styles.avatar__picker__control}>
                  <span className={`${styles.control__label}`}>Scale:</span>
                  <Button
                    text='Reset'
                    color='contrast'
                    event={() => {
                      setScale(defaultImgOptions.scale);
                    }}
                  />
                </div>
                <div className={styles.avatar__picker__control}>
                  <div className={styles.slider}>
                    <input
                      type='range'
                      min={1}
                      max={10}
                      step={0.1}
                      value={scale}
                      onChange={(e) => setScale(+e.target.value)}
                    />
                  </div>
                  <div className={styles.value}>
                    <span className={styles.value__item}>{scale}</span>
                  </div>
                </div>
              </Fragment>
              {/* Rotation */}
              <Fragment>
                <div className={styles.avatar__picker__control}>
                  <span className={`${styles.control__label}`}>Rotation:</span>
                  <Button
                    text='Reset'
                    color='contrast'
                    event={() => {
                      setRotate(defaultImgOptions.rotate);
                    }}
                  />
                </div>
                <div className={styles.avatar__picker__control}>
                  <div className={styles.slider}>
                    <input
                      type='range'
                      min={-180}
                      max={180}
                      step={1}
                      value={rotate}
                      onChange={(e) => setRotate(+e.target.value)}
                    />
                  </div>
                  <div className={styles.value}>
                    <span className={styles.value__item}>{rotate}°</span>
                  </div>
                </div>
              </Fragment>
              {/* X */}
              <Fragment>
                <div className={styles.avatar__picker__control}>
                  <span className={`${styles.control__label}`}>X:</span>
                  <Button
                    text='Reset'
                    color='contrast'
                    event={() => {
                      setPosition({
                        ...position,
                        x: defaultImgOptions.position.x,
                      });
                    }}
                  />
                </div>
                <div className={styles.avatar__picker__control}>
                  <div className={styles.slider}>
                    <input
                      type='range'
                      min={0}
                      max={1}
                      step={0.01}
                      value={position.x}
                      onChange={(e) =>
                        setPosition({ ...position, x: +e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.value}>
                    <span className={styles.value__item}>
                      {position.x.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Fragment>
              {/* Y */}
              <Fragment>
                <div className={styles.avatar__picker__control}>
                  <span className={`${styles.control__label}`}>Y:</span>
                  <Button
                    text='Reset'
                    color='contrast'
                    event={() => {
                      setPosition({
                        ...position,
                        y: defaultImgOptions.position.y,
                      });
                    }}
                  />
                </div>
                <div className={styles.avatar__picker__control}>
                  <div className={styles.slider}>
                    <input
                      type='range'
                      min={0}
                      max={1}
                      step={0.01}
                      value={position.y}
                      onChange={(e) =>
                        setPosition({ ...position, y: +e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.value}>
                    <span className={styles.value__item}>
                      {position.y.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Fragment>
            </div>
            <div className={styles.form__controls}>
              <Button
                className='m-10'
                fontSize={2}
                text='Save'
                color='contrast'
                event={() => {
                  getImage(Editor.getImage().toDataURL());
                  getOptions({ rotate, scale, position });
                  closePicker();
                }}
              />
              <Button
                className='m-10'
                fontSize={2}
                text='Close'
                event={closePicker}
              />
            </div>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
};

export default AvatarPicker;
