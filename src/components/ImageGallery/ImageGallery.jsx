import * as style from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, status }) => {
  return (
    <style.ImageGallery id="gallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} status={status} />
      ))}
    </style.ImageGallery>
  );
};

export default ImageGallery;
