import React from 'react'
import TagsFinderContainer from 'containers/Upload/TagsFinderContainer'
import { Label } from '../StyledElements'
import { Helmet } from 'react-helmet'

export default class TagProducts extends React.Component {
  render() {
    return <React.Fragment>
      <Helmet>
        <title>Step 2 - Upload</title>
      </Helmet>
      <Label>Tag products</Label>
      <TagsFinderContainer requestedtags={this.props.requestedtags} addProduct={this.props.addProduct} deleteProduct={this.props.deleteProduct} />
    </React.Fragment>
  }
}
