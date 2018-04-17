import React from 'react'
import Button from 'material-ui/Button';
import Input from 'material-ui/Input'


const styles = {
  container: {
    width: '100%',
    display: 'flex'
  },
  input: {
    flex: '1'
  }
}

class TextInputWithButton extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.handleChange(this.input.value)
    e.target.reset()
  }

  render() {
    return(
      <form style={styles.container} onSubmit={this.onSubmit}>
        <Input type="text" inputRef={(el) => this.input = el} style={styles.input} />
        <Button color="primary" type="submit">{this.props.submitLabel}</Button>
      </form>
    )
  }
}

export default TextInputWithButton
