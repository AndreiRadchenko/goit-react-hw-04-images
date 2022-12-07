import * as style from './ImageGalleryItem.styled';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL },
  status,
  skeleton,
}) => {
  return (
    <style.ImageGalleryItem>
      {skeleton ? (
        <Skeleton height={260} />
      ) : (
        <style.ItemImage src={webformatURL} alt="" />
      )}
    </style.ImageGalleryItem>
  );
};

export default ImageGalleryItem;
