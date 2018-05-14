import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table'
import Grid from 'material-ui/Grid'
import Input, { InputLabel } from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { FormControl } from 'material-ui/Form'
import { withStyles } from 'material-ui/styles'

import SingleSelect from './SingleSelect'
import { docketTypeOptions } from '../../config/constants'

const styles = {
  container: {
    overflowX: 'auto',
    paddingBottom: '1rem',
    paddingTop: '1rem',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f6f6f6',
    },
  },
  cell: {
    borderBottom: 'none',
  },
  formControl: {
    width: '100%',
  },
  input: {
    fontSize: '0.8rem',
  },
  button: {
    marginLeft: '1rem',
  },
  disabled: {
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  docketContainer: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
}

class EditableTable extends React.Component {
  componentDidMount() {
    if (!this.props.tableData) {
      this.createNewRow()
    }
  }

  handleChange = (fieldName, rowIndex) => input => {
    const inputValue = input.target ? input.target.value : input
    let newData = [...this.props.tableData]
    const row = newData[rowIndex]
    const newRow = { ...row, [fieldName]: inputValue }
    newData.splice(rowIndex, 1, newRow)

    this.props.handleChange(newData)
  }

  handleDeleteRow = rowIndex => () => {
    let newData = [...this.props.tableData]
    newData.splice(rowIndex, 1)

    this.props.handleChange(newData)
  }

  defaultRowData = (row = {}) => {
    this.props.tableStructure.map(column => {
      row[column.fieldName] = ''
    })
    return row
  }

  createNewRow = () => {
    const emptyRowData = this.defaultRowData({ allowDelete: true })
    let newTableData = this.props.tableData ? [...this.props.tableData] : []
    newTableData.unshift(emptyRowData)

    this.props.handleChange(newTableData)
  }

  render() {
    const tableData = this.props.tableData ? this.props.tableData : []

    return (
      <Paper style={styles.container}>
        <Button
          style={styles.button}
          onClick={this.createNewRow}
          variant="raised"
          color="primary"
        >
          Add new item
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Docket data</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={`${this.props.id}-row-${index}`}
                className={this.props.classes.row}
              >
                <TableCell
                  style={styles.docketContainer}
                  className={this.props.classes.cell}
                >
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <FormControl className={this.props.classes.formControl}>
                        <InputLabel htmlFor="docket-type" shrink={true}>
                          Docket Type
                        </InputLabel>
                        <SingleSelect
                          value={row.docketType}
                          options={docketTypeOptions}
                          id="docket-type"
                          handleChange={this.handleChange('docketType', index)}
                          style={styles.input}
                          SelectDisplayProps={{
                            style: { whiteSpace: 'pre-wrap' },
                          }}
                          inputProps={{ style: { fontSize: '0.8rem' } }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={24} justify="space-between">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        type={'date'}
                        label="Date"
                        defaultValue={row.date}
                        onBlur={this.handleChange('date', index)}
                        InputProps={{ className: this.props.classes.input }}
                        className={this.props.classes.formControl}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        type={'number'}
                        label="Hours spent"
                        defaultValue={row.hours}
                        onBlur={this.handleChange('hours', index)}
                        InputProps={{ className: this.props.classes.input }}
                        className={this.props.classes.formControl}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        type={'number'}
                        label="Minutes spent"
                        defaultValue={row.minutes}
                        onBlur={this.handleChange('minutes', index)}
                        InputProps={{ className: this.props.classes.input }}
                        className={this.props.classes.formControl}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        type={'text'}
                        label="Description"
                        defaultValue={row.details}
                        onBlur={this.handleChange('details', index)}
                        InputProps={{ className: this.props.classes.input }}
                        className={this.props.classes.formControl}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell
                  padding="checkbox"
                  className={this.props.classes.cell}
                >
                  {!!row.allowDelete ? (
                    <IconButton
                      aria-label="Delete"
                      onClick={this.handleDeleteRow(index)}
                    >
                      &times;
                    </IconButton>
                  ) : (
                    <small style={styles.disabled}>Imported</small>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(EditableTable)
