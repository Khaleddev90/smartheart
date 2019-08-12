import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from 'react-fa';
import sneaker from 'assets/sneaker.svg';
import pendingVideos from 'assets/pending.svg';
import InfiniteScroll from './InfiniteScroll';
import UntagPopup from './UntagPopup';
import TextTruncate from 'react-text-truncate';
import {
  TagsGroup,
  TagItem,
  ProductThumbnail,
  RequestedProduct,
} from '../StyledElements'

import { doSearchProducts } from 'utils/api'


export default class TagsFinder extends React.Component {
  constructor(props) {
    super(props)
    this.selectItem = {}
    this.state = {
      query: '',
      nextQuery: '',
      next: '',
      error: '',
      products: [],
      hasMore: false,
      tags: [],
      isPopupOpen:false,
    }
  }

  newSearch = () => {
    this.setState(prevState => ({
      products: [],
      hasMore: true,
      nextQuery: `${prevState.query}`,
      next: '',
      error: '',
    }))
  }

  handleSearch = async () => {
    if (this.state.nextQuery === '' || this.state.error !== '') return;

    const products = (await doSearchProducts(this.state.query, this.state.next)).data
    if (products.count === 0) {
      this.setState({ error: 'Not found' })
    } else {
      this.setState(prevState => {
        const newProducts = [...prevState.products, ...products['results']]
        return {
          products: newProducts,
          next: products['next'],
          hasMore: newProducts.length < products.count,
          error: '',
        }
      })
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.newSearch()
    }
  }
  tagProduct = (item) => {
    this.setState(prevState => {
      const { tags } = prevState
      const exist = tags.find((tag) => tag.id === item.id);
      if(!exist) {
        this.props.addProduct(item)
        tags.push(item)
        return { tags }
      } else {
        this.selectItem = item
        this.setState({isPopupOpen : true})

      }
    })
  }

  // called after click cancel in the un-tag dialog
  closePopup = () => {
    this.setState({isPopupOpen : false})
  }

  // called after click yes the un-tag dialog
  untagProduct = () => {
    this.removeTagProduct(this.selectItem)
    this.setState({isPopupOpen : false})
    this.selectItem = {}
  }

  removeTagProduct = (item) => {

    if (item.id !== -1) {
      this.setState(prevState => {
        const { tags } = prevState
        tags.splice(tags.findIndex(tag => tag.id === item.id), 1)
        return { tags }
      })
    }

    this.props.deleteProduct(item)
  }

  render() {
    const {
      products,
      hasMore,
      tags,
    } = this.state;

    const tagsId = tags.map(tag => tag.id);
    const productItems = products.map((item, index) => (
      <SearchItem key={index}>
        <SearchItemImage picture={item.primary_picture} />
        <SearchItemInfo>
          <SearchItemInfoTitle>{item.name}</SearchItemInfoTitle>
          <SearchItemInfoParams>
            <SearchItemInfoParamsGroup>
              <SearchItemInfoParamsLabel>Style code:</SearchItemInfoParamsLabel>
              <SearchItemInfoParamsValue>{item.style_code}</SearchItemInfoParamsValue>
            </SearchItemInfoParamsGroup>
            {
              item.release_date && (
                <SearchItemInfoParamsGroup>
                  <SearchItemInfoParamsLabel>Release date:</SearchItemInfoParamsLabel>
                  <SearchItemInfoParamsValue>
                    {moment(item.release_date).format('DD MMMM YYYY')}
                  </SearchItemInfoParamsValue>
                </SearchItemInfoParamsGroup>
              )
            }
          </SearchItemInfoParams>
        </SearchItemInfo>
        <SearchItemButton isChecked={tagsId.includes(item.id)} onClick={() => this.tagProduct(item)}>
          {tagsId.includes(item.id) ? <Icon name="check" /> : 'TAG'}
        </SearchItemButton>
      </SearchItem>
    ))


    const selectedProducts = tags.map(item => (
      <TagItem key={item.url}>
        <ProductThumbnail image={item.primary_picture} />
        <TagRemoveIcon onClick={() => this.removeTagProduct(item)} name="times" />
      </TagItem>
    ))

    const requestedProducts = this.props.requestedtags && this.props.requestedtags.length > 0 ?
      this.props.requestedtags.map((item, index) => (
        <TagItem key={index}>
          <RequestedProduct>
            <TextTruncate
              line={3}
              truncateText="…"
              text={item.name}
            />
          </RequestedProduct>
          <TagRemoveIcon onClick={() => this.removeTagProduct(item)} name="times" />
        </TagItem>
      ))
      :
      <div />

    const newProducts = (tags.length === 0 && this.props.requestedtags.length === 0) ?
    <TagItem isNew>
      <DefaultProductThumbnail />
    </TagItem>
    :
    <div />

    let result
    if (this.state.error) {
      result = <h3>{this.state.error}</h3>
    } else {
      result = <InfiniteScroll
        dataLength={products.length}
        hasMore={hasMore}
        loader={<SearchLoading />}
        getScrollParent={() => document.getElementById('root-scroll-upload')}
        useWindow={false}
        loadMore={this.handleSearch}>
        {productItems}
      </InfiniteScroll>
    }

    return (
      <Wrapper>
        <UntagPopup
          isPopupOpen={this.state.isPopupOpen}
          item={this.selectItem}
          untagProduct={this.untagProduct}
          closePopup={this.closePopup}
        />
        <TagsGroup>
          {selectedProducts}
          {requestedProducts}
          {newProducts}
        </TagsGroup>
        <SearchGroup>
          <SearchInput type="text"
            placeholder="Type tag name"
            value={this.state.value}
            onKeyPress={this.handleKeyPress}
            onChange={e => this.setState({ query: e.target.value })} />
          <SearchBtn onClick={this.newSearch}>
            <SearchIcon name="search" />
          </SearchBtn>
        </SearchGroup>
        {result}
      </Wrapper>
    );
  }
}

TagsFinder.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
  tags: PropTypes.array,
  onSearch: PropTypes.func,
  onSelectTag: PropTypes.func,
};

TagsFinder.defaultProps = {
  products: [],
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const DefaultProductThumbnail = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background-image: url(${sneaker})};
  background-size: 75%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fff;
`;

const SearchGroup = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  border: 1px solid #a1a1a1;
  flex: 1;
  padding: 19px 29px;
  font-size: 18px;
  font-weight: 400;
  color: #000000;
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #a1a1a1;
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    opacity: 1; /* Firefox */
  }
`;

const SearchBtn = styled.button`
  width: 130px;
  height: 60px;
  border: none;
  border-radius: 8px;
  background-color: #d8d8d8;
  margin-left: 20px;
  cursor: pointer;
`;

const SearchIcon = styled(Icon)`
  color: #000000;
  &.fa {
    font-size: 30px;
  }
`;

const SearchLoading = styled.div`
  background-image: url(${pendingVideos});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100px;
  width: 100%;
  height: 170px;
`;

const SearchItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  :last-child {
    margin-bottom: 0;
  }
`;

const SearchItemImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #979797;
  background-image: ${props => `url(${props.picture})`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const SearchItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  flex: 1;
`;

const SearchItemInfoTitle = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SearchItemInfoParams = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchItemInfoParamsGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 35px;
  color: #000000;
  font-size: 18px;
  &:first-child {
    margin-left: 0;
  }
`;

const SearchItemInfoParamsLabel = styled.div`
  font-weight: 600;
`;

const SearchItemInfoParamsValue = styled.div`
  margin-left: 5px;
  color: #a1a1a1;
  font-weight: 400;
`;

const SearchItemButton = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color:  ${props => props.isChecked ? '#21cd6c' : '#009fff'};
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TagRemoveIcon = styled(Icon)`
  color: #000000;
  position: absolute;
  top: 2px;
  right: 2px;
  cursor: pointer;
  display: none;

  &.fa {
    display: none;
    font-size: 18px;
  }
`;
