import * as style from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
// import loadingImg from '../../galleryApi/loading.webp';
import { Status } from '../App';

const createSceletonImages = () => {
  const images = [...Array(12)].map((key, idx) => ({
    id: idx,
    // webformatURL: loadingImg,
  }));
  return images;
};

const ImageGallery = ({ images, status, onClick }) => {
  return (
    <style.ImageGallery id="gallery" onClick={onClick}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
      {status === Status.PENDING &&
        createSceletonImages().map(image => (
          <ImageGalleryItem key={image.id} skeletonActive />
        ))}
    </style.ImageGallery>
  );
};

export default ImageGallery;
