import * as style from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <style.ImageGallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </style.ImageGallery>
  );
};

export default ImageGallery;
