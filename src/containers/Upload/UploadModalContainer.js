import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, branch, lifecycle, renderNothing } from 'recompose';

import {
  publishProduct,
  setProduct,
  missingProduct,
  removeProduct,
  cleanProducts,
} from 'reducers/publishProduct';

import {
  uploadFilePublish,
  uploadClean,
  deleteVideo,
  uploadFileCancel,
} from 'reducers/uploadFile';

import {
  productsSearchClear,
} from 'reducers/searchProducts';

import UploadModal from 'components/Upload/UploadModal';

const mapDispatchToProps = dispatch => bindActionCreators({
  publishProduct,
  setProduct,
  missingProduct,
  removeProduct,
  cleanProducts,
  uploadFilePublish,
  uploadClean,
  deleteVideo,
  uploadFileCancel,
  productsSearchClear,
}, dispatch);

const mapStateToProps = state => ({
  progress: state.uploadFile.progress,
  isUploaded: state.uploadFile.isFileUploaded,
  video: state.uploadFile.postedVideo,
  products: state.publishProduct.productsTags,
  tags: state.publishProduct.tags,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.visible !== this.props.visible) {
        const element = document.getElementById("root");
        if (element.classList) {
          element.classList.toggle("modal-open");
        } else {
          let classes = element.className.split(" ");
          const i = classes.indexOf("modal-open");
          if (i >= 0)
            classes.splice(i, 1);
          else
            classes.push("modal-open");
          element.className = classes.join(" ");
        }
      }
    }
  }),
  withHandlers({
    onClose: ({ uploadFileCancel, deleteVideo, uploadClean, cleanProducts, productsSearchClear, onClose }) => () => {
      onClose();
      uploadFileCancel();
      deleteVideo();
      uploadClean();
      cleanProducts();
      productsSearchClear();
    },
    onDone: ({ uploadFileCancel, uploadClean, cleanProducts, productsSearchClear, onClose }) => () => {
      onClose();
      uploadFileCancel();
      uploadClean();
      cleanProducts();
      productsSearchClear();
    },
    onPublish: ({ publishProduct }) => (title, description) => {
      publishProduct({ title, description });
    },
    onSelectTag: ({ setProduct }) => (data) => {
      setProduct(data);
    },
    onRequestTag: ({ missingProduct }) => (data) => {
      missingProduct(data);
    },
  }),
  branch(
    ({ visible }) => {
      return !visible;
    },
    renderNothing
  )
)(UploadModal)
