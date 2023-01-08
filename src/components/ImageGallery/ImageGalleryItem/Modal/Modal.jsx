import { Component } from 'react';
import { Overlay, ModalWindow, Image } from './Modal.styled';

export class Modal extends Component {
  handleKeyDown = event => {
    console.log(event);
    if (event.code === 'Escape') {
      this.props.onClosure(event);
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClosure(event);
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { description, image } = this.props;

    return (
      <Overlay onClick={this.handleClick}>
        <ModalWindow>
          <Image src={image} alt={description} />
        </ModalWindow>
      </Overlay>
    );
  }
}
