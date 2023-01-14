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

  const totalHits = useRef(0);
  const isFirstExecution = useRef(true);

  useEffect(() => {
    if (isFirstExecution.current) {
      isFirstExecution.current = false;
      return;
    }

    try {
      const updateImages = async () => {
        const images = await fetchImages(query, page);
        totalHits.current = images.totalHits;
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
      {images.length < totalHits.current && !isLoading && (
        <Button onClick={handleClick} />
      )}
      {isLoading && <Loader />}
    </Application>
  );
};

// export class App extends Component {
//   totalHits = 0;

//   async componentDidUpdate(_, prevState) {
//     const { page, query } = state;

//     if (prevquery !== query || prevpage !== page) {
//       try {
//         const images = await fetchImages(query, page);
//         totalHits = images.totalHits;
//         setState(prevState => ({
//           images: [...previmages, ...images.hits],
//           isLoading: false,
//         }));
//       } catch {
//         setState({
//           query: '',
//           images: [],
//           page: 1,
//           isLoading: false,
//           error: true,
//         });
//       }
//     }
//   }

//   const handleSubmit = async currentQuery => {
//     setState({
//       query: currentQuery,
//       images: [],
//       page: 1,
//       isLoading: true,
//       error: false,
//     });
//   };

//   cosnt handleClick = async () => {
//     setState(prevState => {
//       return { page: prevpage + 1, isLoading: true };
//     });
//   };

//   render() {
//     return (
//       <Application>
//         <Searchbar onSubmit={handleSubmit} />
//         <ImageGallery images={images} />
//         {error && <h2>Oops, something went wrong :( Try again.</h2>}
//         {images.length < totalHits && !isLoading && (
//           <Button onClick={handleClick} />
//         )}
//         {isLoading && <Loader />}
//       </Application>
//     );
//   }
// }
