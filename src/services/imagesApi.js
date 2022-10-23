import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKey = '16763452-f17d9c1e6c077c804b5291364';

const fetchImagesWithQuery = (searchQuery, page = 1) => {
  return axios(
    `/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    return response.data;
  });
};

export default fetchImagesWithQuery;
