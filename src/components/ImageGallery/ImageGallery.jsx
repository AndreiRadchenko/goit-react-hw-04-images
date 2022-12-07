import * as style from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
import loadingImg from '../../galleryApi/loading.webp';
import { Status } from '../App';

const createSceletonImages = () => {
  const images = [...Array(12)].map((key, idx) => ({
    id: idx,
    webformatURL: loadingImg,
  }));
  return images;
};

const ImageGallery = ({ images, status }) => {
  return (
    <style.ImageGallery id="gallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} status={status} />
      ))}
      {status === Status.PENDING &&
        createSceletonImages().map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            status={status}
            skeleton
          />
        ))}
    </style.ImageGallery>
  );
};

export default ImageGallery;
