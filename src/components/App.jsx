import { Component } from 'react';
import ReactModal from 'react-modal';
import fetchImages from '../galleryApi';
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

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    marginTop: '30px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

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
    // console.log(e.target.getAttribute('data-image'));
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
        // scrollWindow();
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
        <ReactModal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <img src={this.state.largeImageURL} alt=""></img>
        </ReactModal>
        <Searchbar onSubmit={this.handleSubmit} />
        <Box margin="30px auto" textAlign="center" as="section">
          {status === Status.ERROR && (
            <p>Sorry, something went wrong. Please try again.</p>
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
