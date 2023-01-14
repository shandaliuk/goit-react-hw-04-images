import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalWindow, Image } from './Modal.styled';

export const Modal = ({ description, image, onClosure }) => {
  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onClosure(event);
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClosure(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClosure]);

  return (
    <Overlay onClick={handleClick}>
      <ModalWindow>
        <Image src={image} alt={description} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClosure: PropTypes.func.isRequired,
};
