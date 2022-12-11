import { Component } from 'react';
import ReactModal from 'react-modal';
import { customStyles } from 'components/ReactModal';
import fetchImages from '../galleryApi';
import Box from 'Box';
import Searchbar from 'components/Searchbar';
import { ImageGallery, scrollWindow } from 'components/ImageGallery';
import Button from 'components/Button';
import toast, { Toaster } from 'react-hot-toast';

export const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notfound',
  ERROR: 'error',
};

ReactModal.setAppElement('#root');

export class App extends Component {
  state = {
    page: 1,
    query: '',
    status: Status.IDLE,
    images: [],
    total: 0,
    modalOpen: false,
    largeImageURL: '',
  };

  openModal = e => {
    const largeImage = e.target.getAttribute('data-image');
    if (!largeImage) {
      return;
    }
    this.setState({ modalOpen: true, largeImageURL: largeImage });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  resetState = newStatus =>
    this.setState({
      page: 1,
      total: 0,
      images: [],
      status: newStatus,
    });

  handleSubmit = query => {
    this.setState({
      query,
      page: 1,
      total: 0,
      images: [],
      status: Status.PENDING,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
      status: Status.PENDING,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const { page: newPage, query: newQuery, total } = this.state;
    if (
      newQuery === prevState.query &&
      newPage === prevState.page &&
      total === prevState.total
    ) {
      return;
    }
    if (newQuery === '') {
      this.resetState(Status.IDLE);
      return;
    }
    // newQuery !== prevState.query;
    if (total === 0) {
      try {
        const apiResponse = await fetchImages(newQuery);
        if (apiResponse.total === 0) {
          this.resetState(Status.NOTFOUND);
          toast("Sorry, we didn't find any pictures", {
            icon: '🥺',
          });
        } else {
          this.setState({
            total: apiResponse.total,
            images: apiResponse.hits.map(image => ({
              id: image.id,
              webformatURL: image.webformatURL,
              largeImageURL: image.largeImageURL,
            })),
            status: Status.RESOLVED,
          });
        }
      } catch (error) {
        this.resetState(Status.ERROR);
        toast.error('Sorry, something went wrong.');
      }
      return;
    }
    if (newPage > prevState.page) {
      try {
        scrollWindow();
        const apiResponse = await fetchImages(newQuery, newPage);
        const newImages = apiResponse.hits.map(image => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        }));
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          status: Status.RESOLVED,
        }));
      } catch (error) {
        this.resetState(Status.ERROR);
        toast.error('Sorry, something went wrong.');
      }
    }
  }

  render() {
    const { status, total, images } = this.state;
    const isButtonVisible = total > images.length;
    return (
      <>
        <Toaster position="top-right" containerStyle={{ zIndex: '1000' }} />
        <ReactModal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Large Image Modal"
        >
          <img src={this.state.largeImageURL} alt=""></img>
        </ReactModal>
        <Searchbar onSubmit={this.handleSubmit} />
        <Box margin="30px auto" textAlign="center" as="section">
          {status === Status.ERROR && (
            <p style={{ color: 'tomato' }}>
              Sorry, something went wrong. Please try again.
            </p>
          )}
          {status === Status.IDLE && (
            <p>Please, write query in search fild and hit Enter</p>
          )}
          {status === Status.NOTFOUND && (
            <p>Sorry, we didn't find any pictures for your query</p>
          )}
          {(status === Status.PENDING || status === Status.RESOLVED) && (
            <ImageGallery
              onClick={this.openModal}
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
