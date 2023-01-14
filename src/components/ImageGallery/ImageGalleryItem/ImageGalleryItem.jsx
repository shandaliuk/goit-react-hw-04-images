import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ description, smallImage, largeImage }) => {
  const [modalIsOpened, setModalOpening] = useState(false);

  const handleModalOpening = () => {
    setModalOpening(true);
  };

  const handleModalClosure = () => {
    setModalOpening(false);
  };

  return (
    <Item>
      <Image src={smallImage} alt={description} onClick={handleModalOpening} />
      {modalIsOpened && (
        <Modal
          image={largeImage}
          description={description}
          onClosure={handleModalClosure}
        />
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  description: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
