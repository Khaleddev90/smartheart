import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers } from 'recompose';

import {
  removeProduct,
} from 'reducers/publishProduct';

import {
  productsSearch,
} from 'reducers/searchProducts';

import TagsFinder from 'components/Upload/Steps/TagProducts/TagsFinder';

const mapDispatchToProps = dispatch => bindActionCreators({
  removeProduct,
  productsSearch,
}, dispatch);

const mapStateToProps = state => ({
  loading: state.searchProducts.isSearched,
  products: state.searchProducts.productsFound,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSearch: ({ productsSearch }) => (query, nextPage) => {
      productsSearch(query, nextPage);
    }
  })
)(TagsFinder)
