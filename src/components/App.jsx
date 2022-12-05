import { Component } from 'react';
import { Status } from 'components/ImageGallery';
import Box from 'Box';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    status: Status.IDLE,
  };

  handleStatus = newStatus => this.setState({ status: newStatus });

  handleSubmit = query => this.setState({ query });

  handleLoadMore = () => this.setState(prev => ({ page: prev.page + 1 }));

  render() {
    const { page, query, status } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <Box margin="30px auto" as="section">
          <ImageGallery
            onStatusChange={this.handleStatus}
            page={page}
            query={query}
            status={status}
          />
        </Box>
        <Box margin="30px auto" as="section">
          <Button onClick={this.handleLoadMore}>Load More</Button>
        </Box>
      </>
    );
  }
}
