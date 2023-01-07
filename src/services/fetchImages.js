import axios from 'axios';

const KEY = '32195177-b6f496b0ec037ea4cdfde6da3';

const PER_PAGE = 12;

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImages = async (query, page, perPage) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );

  return response.data;
};
