import { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    modalIsOpened: false,
  };

  handleModalOpening = () => {
    this.setState({ modalIsOpened: true });
  };

  handleModalClosure = () => {
    this.setState({ modalIsOpened: false });
  };

  render() {
    const { description, smallImage, largeImage } = this.props;
    return (
      <Item>
        <Image
          src={smallImage}
          alt={description}
          onClick={this.handleModalOpening}
        />
        {this.state.modalIsOpened && (
          <Modal
            image={largeImage}
            description={description}
            onClosure={this.handleModalClosure}
          />
        )}
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  description: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
