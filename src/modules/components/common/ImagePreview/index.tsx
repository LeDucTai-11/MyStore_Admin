import { COLOR_CODE } from '@components/configs';
import { Backdrop, Stack } from '@mui/material';
import { Callback, emptyFunction } from '@shared';
import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { connect } from 'react-redux';
import { UploadFileType } from '../FileUpload/helpers';
import Image from '../Image';
import './styles.scss';

const ImagePreview: React.FC<Props> = ({
  image,
  imageUrl = '',
  thumbnailWidth = '100px',
  thumbnailHeight = '100px',
  onRemove = emptyFunction,
}) => {
  const [parsedUrl, setParsedUrl] = React.useState<string>('');
  const [isZooming, setIsZooming] = React.useState<boolean>(false);

  const { file } = image || {};

  useEffect(() => {
    if ((!file && !imageUrl) || parsedUrl) return;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const { result } = e.target;
      setParsedUrl(result as string);
    };
    if (file) {
      fileReader.readAsDataURL(file as File);
      return;
    }
    if (imageUrl) {
      setParsedUrl(imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setShowBackdrop = () => setIsZooming((prev) => !prev);

  const handleRemove = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    onRemove();
  };

  const renderImage = (imgWidth: string, imgHeight: string) => (
    <Stack
      className="cmp-preview-image__container"
      sx={{ width: imgWidth, height: imgHeight, justifyContent: 'center' }}
    >
      {!isZooming && (
        <i>
          <AiOutlineClose
            color={COLOR_CODE.WHITE}
            fontSize={20}
            className="cmp-preview-image__remove"
            onClick={handleRemove}
          />
        </i>
      )}
      <Image
        className="cmp-preview-image__image"
        src={parsedUrl}
        alt={file?.name}
        style={{ height: imgHeight }}
        onClick={setShowBackdrop}
      />
    </Stack>
  );

  return (
    <Stack className="cmp-preview-image" sx={{ width: thumbnailWidth, height: thumbnailHeight }}>
      {renderImage(thumbnailWidth, thumbnailHeight)}
      {isZooming && (
        <Backdrop
          open={isZooming}
          sx={{ zIndex: 99999 }}
          onClick={setShowBackdrop}
          transitionDuration={500}
        >
          {renderImage('calc(100vw - 750px)', 'auto')}
        </Backdrop>
      )}
    </Stack>
  );
};

type Props = typeof mapDispatchToProps & {
  image: UploadFileType;
  thumbnailWidth?: string;
  thumbnailHeight?: string;
  imageUrl?: string;
  onRemove?: Callback;
};

const mapDispatchToProps = {};

export default connect(undefined, mapDispatchToProps)(ImagePreview);
