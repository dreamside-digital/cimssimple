import React from 'react'
import ReactSelect from 'react-select'

import 'react-select/dist/react-select.css'

const styles = {
  width: '100%',
  border: '1px solid #932F6D',
  fontSize: '1.2rem',
}

const createOption = value => {
  return { label: value, value: value }
}

const Select = props => {
  const onChange = select => {
    props.handleChange(select ? select.value : select)
  }
  const options = props.options.map(item => createOption(item))
  const selected = createOption(props.value)

  return (
    <ReactSelect
      {...props}
      onChange={onChange}
      value={selected}
      options={options}
      style={styles}
    />
  )
}

export default Select
