import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import fetchImagesWithQuery from '../services/imagesApi';
import Button from './button/Button';
import { Oval as Loader } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import Modal from './modal/Modal';

import styles from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    results: [],
    loading: false,
    modalImage: null,
    theEnd: false,
  };

  handleSearchbarSubmit = query => {
    this.setState({
      searchQuery: query,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery && nextQuery.trim().length) {
      this.setState(
        {
          page: 1,
          results: [],
          theEnd: false,
        },
        () => {
          this.fetchImages();
        }
      );
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({
      loading: true,
    });

    fetchImagesWithQuery(searchQuery, page)
      .then(({ hits: images, total }) => {
        if (total === 0) {
          toast.error('Images or pictures not found');
          return;
        }
        if (page === 1) {
          toast.success(`${total} images found`);
        }
        this.setState(
          prevState => ({
            results: [...prevState.results, ...images],
            page: prevState.page + 1,
            theEnd: [...prevState.results, ...images].length === total,
          }),
          () => {
            if (page > 1) {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
              });
            }
          }
        );
      })
      .catch(error => {
        toast.error(
          'Something went wrong, open dev console to read error message'
        );
        console.log(error);
      })
      .finally(() => {
        this.setState({
          loading: false,
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
        <Toaster position="top-right" />
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
