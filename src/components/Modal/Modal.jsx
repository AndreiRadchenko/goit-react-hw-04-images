import ReactModal from 'react-modal';
import { Component } from 'react';
// import { createPortal } from 'react-dom';
// import * as style from './Modal.styled';

// const modalRoot = document.querySelector('#modal-root');

ReactModal.setAppElement('#modal-root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
};

export default class Modal extends Component {
  state = {
    isOpen: false,
  };

  openModal = () => this.setState({ isOpen: this.props.isOpen });

  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <ReactModal
        isOpen={this.state.isOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {this.props.children}
      </ReactModal>
    );
  }
}
