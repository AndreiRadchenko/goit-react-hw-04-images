import { Component } from 'react';
import fetchImages from '../galleryApi';
// import loadingImg from '../galleryApi/loading.webp';
import Box from 'Box';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

export const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notfound',
  ERROR: 'error',
};

// const createSceletonImages = () => {
//   const images = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(key => ({
//     id: key,
//     image: { webformatURL: loadingImg },
//   }));
//   return images;
// };

const scrollWindow = () => {
  const imageCard = document
    .querySelector('#gallery')
    ?.firstElementChild?.getBoundingClientRect();
  if (imageCard) {
    const { height: cardHeight } = imageCard;
    window.scrollBy({
      top: cardHeight * 3,
      behavior: 'smooth',
    });
  }
};

export class App extends Component {
  state = {
    page: 1,
    query: '',
    status: Status.IDLE,
    images: [],
    total: 0,
  };

  resetState = newStatus =>
    this.setState({
      page: 1,
      total: 0,
      images: [],
      status: newStatus,
    });

  handleSubmit = query => this.setState({ query });

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  async componentDidUpdate(_, prevState) {
    const { page: newPage, query: newQuery } = this.state;
    if (newQuery === prevState.query && newPage === prevState.page) {
      if (newPage > 1) {
        scrollWindow();
      }
      return;
    }
    if (newQuery === '') {
      this.resetState(Status.IDLE);
      return;
    }
    if (newQuery !== prevState.query) {
      try {
        this.resetState(Status.PENDING);
        const apiResponse = await fetchImages(newQuery);
        if (apiResponse.total === 0) {
          this.resetState(Status.NOTFOUND);
        } else {
          this.setState({
            total: apiResponse.total,
            images: apiResponse.hits,
            status: Status.RESOLVED,
          });
        }
      } catch (error) {
        this.resetState(Status.ERROR);
      }
      return;
    }
    if (newPage !== prevState.page) {
      try {
        this.setState({ status: Status.PENDING });
        const apiResponse = await fetchImages(newQuery, newPage);
        this.setState(prevState => ({
          images: [...prevState.images, ...apiResponse.hits],
          status: Status.RESOLVED,
        }));
      } catch (error) {
        this.resetState(Status.ERROR);
      }
    }
  }

  render() {
    const { status, total, images } = this.state;
    const isButtonVisible = total > images.length;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <Box margin="30px auto" textAlign="center" as="section">
          {status === Status.ERROR && (
            <p>Sorry, something went wrong. Please try again.</p>
          )}
          {status === Status.IDLE && (
            <p>Please, enter query in search fild and hit Enter</p>
          )}
          {status === Status.NOTFOUND && (
            <p>Sorry, we didn't find any pictures for your query</p>
          )}
          {(status === Status.PENDING || status === Status.RESOLVED) && (
            <ImageGallery
              images={this.state.images}
              status={this.state.status}
            />
          )}
        </Box>
        <Box margin="30px auto" textAlign="center" as="section">
          {isButtonVisible && (
            <Button onClick={this.handleLoadMore}>Load More</Button>
          )}
        </Box>
      </>
    );
  }
}
