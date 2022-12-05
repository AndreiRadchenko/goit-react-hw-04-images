import { Component } from 'react';
import * as style from './ImageGallery.styled';
import fetchImages from 'galleryApi/galleryApi';
import ImageGalleryItem from 'components/ImageGalleryItem';

export const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  ERROR: 'error',
};

class ImageGallery extends Component {
  state = {
    total: 0,
    images: [],
  };
  async componentDidUpdate(prevProps, PrevState) {
    const { page: newPage, query: newQuery, onStatusChange } = this.props;
    if (newQuery === '') {
      onStatusChange(Status.IDLE);
      return;
    }
    if (newPage !== prevProps.page || newQuery !== prevProps.query) {
      try {
        onStatusChange(Status.PENDING);
        const apiResponse = await fetchImages(newQuery, newPage);
        if (apiResponse.total === 0) {
          onStatusChange(Status.REJECTED);
          return;
        }
        this.setState({ total: apiResponse.total, images: apiResponse.hits });
        onStatusChange(Status.RESOLVED);
      } catch (error) {
        onStatusChange(Status.ERROR);
        console.log(error.message);
      }
    }
  }

  render() {
    const { status } = this.props;
    if (status === Status.RESOLVED) {
      return (
        <style.ImageGallery>
          {this.state.images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </style.ImageGallery>
      );
    }
    if (status === Status.IDLE) {
      return <p>Please, enter query in search fild and hit Enter</p>;
    }
    if (status === Status.REJECTED) {
      return <p>Sorry, we didn't find pictures for your query</p>;
    }
  }
}

export default ImageGallery;
