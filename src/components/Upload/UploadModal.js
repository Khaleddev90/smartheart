import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ProgressBar from 'components/Upload/ProgressBar'
import { Icon } from 'react-fa'
import { NoTagError } from 'components/Upload/Modals'
import Description from './Steps/Description'
import TagProducts from './Steps/TagProducts'
import Final from './Steps/Final'
import BottomBar from './BottomBar'
import ProductRequestPopup from './ProductRequestPopup'
import ProductRequestSuccessPopup from './ProductRequestSuccessPopup'

class UploadModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      errors: { title: '', description: '', products: '', colour: '', name: '', stylecode: '' },
      model: { title: '', description: '', products: [] },
      requestedProductsModel: { id: -1, colour: '', name: '', stylecode: '', notes: '', file:[] },
      requestedProducts: [],
      validFields: new Set(),
      hasNoTags: false,
      isPopupOpen:false,
      isSuccessPopupOpen: false,
    }
  }

  static checkErrors(fieldName, value) {
    let error = ''
    switch (fieldName) {
      case 'title':
        error = (value.length < 2 || value.length > 140) ? 'Your video title must be between 2 and 140 characters' : ''
        break
      case 'description':
        error = (value.length < 2 || value.length > 2000) ? 'Your video description must be between 2 and 200 characters' : ''
        break
      case 'products':
        error = (value.length === 0) ? 'Not enoght products' : ''
        break
      case 'name':
        error = (value.length < 2 || value.length > 140) ? 'Product name must be between 2 and 140 characters' : ''
        break
      case 'colour':
        error = (value.length < 2 || value.length > 140) ? 'Colour must be between 2 and 140 characters' : ''
        break
      default:
        return
    }
    return error
  }

  handleChangeModel = (fieldName, value) => {
    if (Object.keys(this.state.model).includes(fieldName)) {
      this.setState(prevState => {
        const model = prevState['model']
        if (model[fieldName] === value) {
          // do nothing if model hasn't changed
          return {}
        }
        const errors = prevState['errors']
        const error = UploadModal.checkErrors(fieldName, value)
        if (error === '') {
          prevState.validFields.add(fieldName)
        } else {
          prevState.validFields.delete(fieldName)
        }
        errors[fieldName] = error
        model[fieldName] = value
        return { model: model, errors: errors }
      })
    }
  }

  handleChangeRequestModel = (fieldName, value) => {
    if (Object.keys(this.state.requestedProductsModel).includes(fieldName)) {
      this.setState(prevState => {
        const requestedProductsModel = prevState['requestedProductsModel']
        if (requestedProductsModel[fieldName] === value) {
          // do nothing if model hasn't changed
          return {}
        }
        const errors = prevState['errors']
        const error = UploadModal.checkErrors(fieldName, value)
        errors[fieldName] = error
        requestedProductsModel[fieldName] = value
        return { requestedProductsModel: requestedProductsModel, errors: errors }
      })
    }
  }

  //show produt request popup
  handleCantFind = () => {
    this.setState({isPopupOpen : true})
  }

  handleNextStep = () => {
    const { onPublish } = this.props
    this.setState(prevState => {
      const currentStep = prevState.currentStep
      switch (currentStep) {
        case 2:
          const model = prevState.model
          const { onSelectTag, onRequestTag } = this.props
          onSelectTag(model.products)
          const totalFields = Object.keys(this.state.model).length

          if (prevState.requestedProducts.length > 0) {
            onRequestTag(prevState.requestedProducts)
          }
          if (prevState.validFields.size === totalFields || prevState.requestedProducts.length > 0) {
            onPublish(model.title, model.description) // Trigger Publish event as soon as we switched to step 3
            return {currentStep: currentStep + 1}
          } else {
            return { hasNoTags: true }
          }
        default:
          return { currentStep: currentStep + 1 }
      }
    })
  }

  handleDone = () => {
    this.props.uploadFileFinished();
    this.props.onDone();
  }

  addProduct = (item) => {
    this.setState(prevState => {
      const model = prevState.model
      model.products = [...model.products, item]
      if (model.products.length > 0) {
        prevState.validFields.add('products')
      } else {
        prevState.validFields.delete('products')
      }
      return { model: model, validFields: prevState.validFields }
    })
  }

  deleteProduct = (item) => {
    if (item.id > 0) {
      this.setState(prevState => {
        const model = prevState.model
        model.products.splice(model.products.indexOf(item), 1);
        if (model.products.length > 0) {
          prevState.validFields.add('products')
        } else {
          prevState.validFields.delete('products')
        }
        return { model: model, validFields: prevState.validFields }
      })
    } else {

      this.setState(prevState => {
        let requestedProducts = prevState.requestedProducts
        requestedProducts = requestedProducts.filter( e => e.id !== item.id)

        return { requestedProducts: requestedProducts}
      })
      this.setState({requestedProductsModel:{id: -1, colour: '', name: '', stylecode: '', notes: '', file:[]}})
    }

  }

  closePopup = () => {
    this.setState({isPopupOpen : false})
  }

  handleContinue = () => {
    this.setState({isSuccessPopupOpen : false})
  }

  submitProductRequest = () => {
    this.setState({isPopupOpen : false}, this.setState({isSuccessPopupOpen : true}))
    this.setState(prevState => {
      let requestedProducts = prevState.requestedProducts
      prevState.requestedProductsModel.id = -(Math.floor(Math.random() * 1000))
      requestedProducts = [...requestedProducts, prevState.requestedProductsModel]
      return { requestedProducts: requestedProducts }
    })

    this.setState({requestedProductsModel:{id: -1, colour: '', name: '', stylecode: '', notes: '', file:[]}})
  }

  uploadFile = (file) => {
    this.setState({file})
  }

  render() {
    const {
      onClose,
      progress,
      isUploaded,
      video,
    } = this.props;

    const { currentStep, hasNoTags, errors, model, validFields, requestedProductsModel } = this.state
    let element
    let title = `Step ${currentStep} of 2`
    switch (currentStep) {
      case 1:
        element = <Description model={model} errors={errors} handleChangeModel={this.handleChangeModel} />
        break

      case 2:
        element = <TagProducts requestedtags={this.state.requestedProducts} addProduct={this.addProduct} deleteProduct={this.deleteProduct} />
        break

      case 3:
        element = <Final requestedtags={this.state.requestedProducts} model={model} video={video} onDone={this.handleDone} />
        title = 'Your upload is being processed and will appear on the Heartface apps soon!'
        break

      default:
        element = <h1>Wrong choice</h1>
    }

    let isRequestProduct = this.state.requestedProducts.length > 0 ? true : false

    return (
      <Wrapper id={'root-scroll-upload'}>
        <ProductRequestPopup
          isPopupOpen={this.state.isPopupOpen}
          model={requestedProductsModel}
          errors={errors}
          handleChangeModel={this.handleChangeRequestModel}
          closePopup={this.closePopup}
          submitProductRequest={this.submitProductRequest}
        />
        <ProductRequestSuccessPopup
          isPopupOpen={this.state.isSuccessPopupOpen}
          handleContinue={this.handleContinue}
        />
        <ProgressBar value={progress} done={isUploaded} />
        <CloseIcon
          onClick={onClose}
          size="2x"
          name="remove"
          currentstep={currentStep} />
        <Steps>
          <Step>
            <Title>{title}</Title>
            {element}
          </Step>
        </Steps>
        <NoTagError
          publishNoTagHandler={this.handleNextStep}
          isPopupOpen={hasNoTags}
          closePopup={() => this.setState({ hasNoTags: false })}
        />
        <BottomBar currentStep={currentStep} handleCantFind={this.handleCantFind} handleNextStep={this.handleNextStep} validFields={validFields} isRequestProduct={isRequestProduct} isUploaded={isUploaded} />
      </Wrapper>
    );
  }
}

UploadModal.propTypes = {
  visible: PropTypes.bool,
  progress: PropTypes.number,
  products: PropTypes.array,
  video: PropTypes.object,
  isUploaded: PropTypes.bool,
  searchResult: PropTypes.array,
  onClose: PropTypes.func,
  onDone: PropTypes.func,
  onPublish: PropTypes.func,
  onSearchTag: PropTypes.func,
  uploadFileFinished: PropTypes.func,
};


export default UploadModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  overflow-y: scroll;
  z-index: 1010;
  padding-bottom: 60px;
`;

const Title = styled.h1`
  color: #000000;
  font-size: 48px;
  font-weight: 600;
  margin-top: 0;
  text-align: ${props => props.center ? 'center' : 'left'};
`;

const Steps = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const Step = styled.div`
  width: 1040px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled(Icon)`
  cursor: pointer;
  color: #000000;
  margin-left: 50px;
  margin-top: 25px;
  visibility: ${props => (props.currentstep !== 3) ? 'visible' : 'hidden'};
`;
