import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import fetchImagesWithQuery from '../services/imagesApi';
import Button from './button/Button';
import { Oval as Loader } from 'react-loader-spinner';
import Modal from './modal/Modal';

import styles from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    results: [],
    loading: false,
    modalImage: null,
    firstFetch: true,
    theEnd: false,
  };

  handleSearchbarSubmit = query => {
    this.setState({
      searchQuery: query,
    });
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({
        page: 1,
        results: [],
        firstFetch: true,
        theEnd: false,
      });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({
      loading: true,
    });

    fetchImagesWithQuery(searchQuery, page)
      .then(({hits: images, total}) => {
        this.setState(prevState => ({
          results: [...prevState.results, ...images],
          page: prevState.page + 1,
          theEnd: [...prevState.results, ...images].length === total,
        }));
        if (!this.state.firstFetch) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({
          loading: false,
          firstFetch: false,
        });
      });
  };

  openModal = imageUrl => {
    this.setState({ modalImage: imageUrl });
  };

  closeModal = e => {
    this.setState({ modalImage: null });
  };

  render() {
    const { results, loading, modalImage, theEnd } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery images={results} onClick={this.openModal} />
        {modalImage && (
          <Modal largeImage={modalImage} onClose={this.closeModal} />
        )}
        {loading && (
          <div className={styles.Loader}>
            <Loader
              color="#4fa94d"
              ariaLabel="oval-loading"
              height={100}
              width={100}
            />
          </div>
        )}
        {results.length > 0 && !theEnd && !loading && (
          <Button onClick={this.fetchImages} />
        )}
      </div>
    );
  }
}
