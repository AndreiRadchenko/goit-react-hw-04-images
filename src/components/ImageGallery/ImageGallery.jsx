import * as style from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
// import loadingImg from '../../galleryApi/loading.webp';
import { Status } from '../App';
import PropTypes from 'prop-types';

const createSceletonImages = () => {
  const images = [...Array(12)].map((key, idx) => ({
    id: idx,
    // webformatURL: loadingImg,
  }));
  return images;
};

export const scrollWindow = () => {
  const imageCard = document
    .querySelector('#gallery')
    ?.firstElementChild?.getBoundingClientRect();
  if (imageCard) {
    const { height: cardHeight } = imageCard;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};

export const ImageGallery = ({ images, status, onClick }) => {
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

ImageGallery.propType = {
  images: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
