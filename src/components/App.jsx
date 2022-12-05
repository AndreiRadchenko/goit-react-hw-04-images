import { Component } from 'react';
import fetchImages from '../galleryApi';
import Box from 'Box';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notfound',
  ERROR: 'error',
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
    this.setState({ page: 1, total: 0, images: [], status: newStatus });

  handleSubmit = query => this.setState({ query });

  handleLoadMore = () => this.setState(prev => ({ page: prev.page + 1 }));

  async componentDidUpdate(_, prevState) {
    const { page: newPage, query: newQuery } = this.state;
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
            page: 1,
            total: apiResponse.total,
            images: apiResponse.hits,
            status: Status.RESOLVED,
          });
        }
      } catch (error) {
        this.resetState(Status.ERROR);
      }
    }
    if (newPage !== prevState.page) {
      try {
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
          {status === Status.RESOLVED && (
            <ImageGallery images={this.state.images} />
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
