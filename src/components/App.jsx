import { useState, useEffect, useRef } from 'react';
import { fetchImages } from 'services/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Application } from './App.styled';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isButtonVisible, setButtonVisibility] = useState(false);

  const isFirstExecution = useRef(true);

  useEffect(() => {
    if (isFirstExecution.current) {
      isFirstExecution.current = false;
      return;
    }

    try {
      const updateImages = async () => {
        const images = await fetchImages(query, page);
        setButtonVisibility(page < Math.ceil(images.totalHits / 12));
        setImages(prevState => [...prevState, ...images.hits]);
        setLoading(false);
      };

      updateImages();
    } catch {
      setQuery('');
      setImages([]);
      setPage(1);
      setLoading(false);
      setError(true);
    }
  }, [page, query]);

  const handleSubmit = currentQuery => {
    if (currentQuery === query) {
      return;
    }
    setQuery(currentQuery);
    setImages([]);
    setPage(1);
    setLoading(true);
    setError(false);
  };

  const handleClick = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
  };

  return (
    <Application>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {error && <h2>Oops, something went wrong :( Try again.</h2>}
      {isButtonVisible && !isLoading && <Button onClick={handleClick} />}
      {isLoading && <Loader />}
    </Application>
  );
};
