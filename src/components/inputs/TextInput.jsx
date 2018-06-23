import React from 'react'
import TextField from 'material-ui/TextField'

const styles = {
  width: '100%',
}

class TextInput extends React.Component {
  state = { value: this.props.value || '' }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleBlur = e => this.props.handleChange(this.state.value)

  render() {
    return <TextField type="text" onBlur={this.handleBlur} onChange={this.handleChange} value={this.state.value} style={styles} />
  }
}

export default TextInput