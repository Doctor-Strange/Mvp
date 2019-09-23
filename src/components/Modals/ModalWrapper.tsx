import * as React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { ModalCore } from './ModalCore';

export class ModalWrapper extends React.Component<{
  onRef: any;
  title?: string;
  direction: string;
  height: number;
  width?:string;
maxWidth?:string;
style?:any;
}> {
  state = {
    animation: null,
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
    setTimeout(() => {
      this.setState({ animation: 'md-show' });
    }, 3);
  };

  handleCloseModal = () => {
    this.setState({ animation: null });
    setTimeout(() => {
      this.setState({ showModal: false });
    }, 300);
  };

  componentWillMount() {
    ReactModal.setAppElement('body');
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel={this.props.title}
        className="md-contain"
        overlayClassName={'md-overlay ' + this.state.animation}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.handleCloseModal}
      >
        <ModalCore
          title={this.props.title}
          animationClass={this.state.animation}
          handleClose={this.handleCloseModal}
          direction={this.props.direction}
          height={this.props.height}
          width={this.props.width}
          maxWidth={this.props.maxWidth}
          style={this.props.style}
        >
          {this.props.children}
        </ModalCore>
      </ReactModal>
    );
  }
}
