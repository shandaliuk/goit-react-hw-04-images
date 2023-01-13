import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(image => {
        const { id, webformatURL, largeImageURL, tags } = image;
        return (
          <ImageGalleryItem
            key={id}
            description={tags}
            smallImage={webformatURL}
            largeImage={largeImageURL}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
