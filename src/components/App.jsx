import { Component } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { fetchImages } from 'services/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Application } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
  };

  totalHits = 0;

  handleSubmit = async currentQuery => {
    try {
      await this.setState({ query: currentQuery, isLoading: true, page: 1 });
      const { page, query } = this.state;
      const images = await fetchImages(query, page);
      this.totalHits = images.totalHits;
      this.setState({ images: images.hits, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  handleClick = async () => {
    try {
      await this.setState(prevState => {
        return { page: prevState.page + 1, isLoading: true };
      });
      const { page, query } = this.state;
      const images = await fetchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        isLoading: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Application>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.images.length < this.totalHits && !this.state.isLoading && (
          <Button onClick={this.handleClick} />
        )}
        {this.state.isLoading && (
          // Put in loader file
          <ProgressBar
            height="100"
            width="100"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            borderColor="#3f51b5"
            barColor="#3f51b5"
          />
        )}
      </Application>
    );
  }
}

// Errors handler
// Pattern idle
