import { Component } from 'react';
import * as style from './ImageGalleryItem.styled';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
            onClick={this.openModal}
          />
        )}
      </style.ImageGalleryItem>
    );
  }
}

export default ImageGalleryItem;
