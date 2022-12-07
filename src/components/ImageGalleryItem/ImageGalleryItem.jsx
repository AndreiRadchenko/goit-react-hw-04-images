import * as style from './ImageGalleryItem.styled';
import { Status } from '../App';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL },
  status,
}) => {
  const loading = status === Status.PENDING;
  return (
    <style.ImageGalleryItem>
      {/* {loading && <Skeleton height="100%" />} */}
      <style.ItemImage
        src={webformatURL}
        alt=""
        // style={{ display: loading ? 'none' : undefined }}
      />
    </style.ImageGalleryItem>
  );
};

export default ImageGalleryItem;
