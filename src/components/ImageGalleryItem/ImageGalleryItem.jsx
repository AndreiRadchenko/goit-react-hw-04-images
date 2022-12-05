import * as style from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image: { webformatURL, largeImageURL } }) => {
  return (
    <style.ImageGalleryItem>
      <style.ItemImage src={webformatURL} alt="" />
    </style.ImageGalleryItem>
  );
};

export default ImageGalleryItem;
