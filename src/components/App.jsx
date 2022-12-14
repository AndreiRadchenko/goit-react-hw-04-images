import { useState, useEffect } from 'react';
import { usePrevious } from 'react-use';
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

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const prevPage = usePrevious(page);

  const openModal = e => {
    const largeImage = e.target.getAttribute('data-image');
    if (!largeImage) {
      return;
    }
    setModalOpen(true);
    setLargeImageURL(largeImage);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const resetState = newStatus => {
    setPage(1);
    setTotal(0);
    setImages([]);
    setStatus(newStatus);
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setTotal(0);
    setImages([]);
    setStatus(Status.PENDING);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    setStatus(Status.PENDING);
  };

  const getImagesFromResponse = apiResponse => {
    return apiResponse.hits.map(image => ({
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
    }));
  };

  useEffect(() => {
    if (query === '') {
      setStatus(Status.IDLE);
      return;
    }
    // newQuery !== prevState.query;
    if (total === 0) {
      fetchData();
    }

    async function fetchData() {
      try {
        const apiResponse = await fetchImages(query);
        if (apiResponse.total === 0) {
          setStatus(Status.NOTFOUND);
          toast("Sorry, we didn't find any pictures", {
            icon: '🥺',
          });
        } else {
          setTotal(apiResponse.total);
          setImages(getImagesFromResponse(apiResponse));
          setStatus(Status.RESOLVED);
        }
      } catch (error) {
        this.resetState(Status.ERROR);
        toast.error('Sorry, something went wrong.');
      }
    }
  }, [query, total]);

  useEffect(() => {
    if (page > prevPage) {
      scrollWindow();
      fetchData();
    }

    async function fetchData() {
      try {
        const apiResponse = await fetchImages(query, page);
        setImages(prevState => [
          ...prevState,
          ...getImagesFromResponse(apiResponse),
        ]);
        setStatus(Status.RESOLVED);
      } catch (error) {
        resetState(Status.ERROR);
        toast.error('Sorry, something went wrong.');
      }
    }
  }, [page, prevPage, query]);

  const isButtonVisible = total > images.length;
  return (
    <>
      <Toaster position="top-right" containerStyle={{ zIndex: '1000' }} />
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Large Image Modal"
      >
        <img src={largeImageURL} alt=""></img>
      </ReactModal>
      <Searchbar onSubmit={handleSubmit} />
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
          <ImageGallery onClick={openModal} images={images} status={status} />
        )}
      </Box>
      <Box margin="30px auto" textAlign="center" as="section">
        {isButtonVisible && <Button onClick={handleLoadMore}>Load More</Button>}
      </Box>
    </>
  );
};
