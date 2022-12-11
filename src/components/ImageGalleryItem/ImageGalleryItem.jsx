import { Component } from 'react';
import * as style from './ImageGalleryItem.styled';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {
    const { image, skeletonActive } = this.props;

    return (
      <style.ImageGalleryItem>
        {skeletonActive ? (
          <Skeleton height={260} />
        ) : (
          <style.ItemImage
            src={image.webformatURL}
            data-image={image.largeImageURL}
            alt=""
          />
        )}
      </style.ImageGalleryItem>
    );
  }
}

ImageGalleryItem.propType = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
