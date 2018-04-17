import React from 'react'
import Button from 'material-ui/Button';

const styles = {
  container: {
    width: '100%',
    display: 'flex'
  },
  input: {
    border: '1px solid #932F6D',
    padding: '0.5rem',
    fontSize: '1.2rem',
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
        <input type="text" ref={(el) => this.input = el} style={styles.input} />
        <Button color="primary" type="submit">{this.props.submitLabel}</Button>
      </form>
    )
  }
}

export default TextInputWithButton
