import React from 'react'
import PropTypes from 'prop-types'
import { map, find, without } from 'lodash'
import uuidv4 from 'uuid/v4'
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

const DocketForm = props => {
  const { docket } = props;

  return(
    <TableRow className={props.classes.row}>
      <TableCell
        style={styles.docketContainer}
        className={props.classes.cell}
      >
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <FormControl className={props.classes.formControl}>
              <InputLabel htmlFor="docket-type" shrink={true}>
                Docket Type
              </InputLabel>
              <SingleSelect
                value={docket.docketType}
                options={docketTypeOptions}
                id="docket-type"
                handleChange={props.handleChange('docketType', docket.uid)}
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
              value={docket.date}
              onChange={props.handleChange('date', docket.uid)}
              InputProps={{ className: props.classes.input }}
              className={props.classes.formControl}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type={'number'}
              label="Hours spent"
              value={docket.hours}
              onChange={props.handleChange('hours', docket.uid)}
              InputProps={{ className: props.classes.input }}
              className={props.classes.formControl}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type={'number'}
              label="Minutes spent"
              value={docket.minutes}
              onChange={props.handleChange('minutes', docket.uid)}
              InputProps={{ className: props.classes.input }}
              className={props.classes.formControl}
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
              value={docket.details}
              onChange={props.handleChange('details', docket.uid)}
              InputProps={{ className: props.classes.input }}
              className={props.classes.formControl}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </TableCell>

      <TableCell
        padding="checkbox"
        className={props.classes.cell}
      >

          <IconButton
            aria-label="Delete"
            onClick={props.handleDelete}
          >
            &times;
          </IconButton>

      </TableCell>
    </TableRow>
  )
}


class DocketingTable extends React.Component {
  handleChange = (fieldName, uid) => input => {
    const inputValue = input.target ? input.target.value : input
    let newTableData = [...this.props.tableData]
    const docketToUpdate = find(newTableData, docket => docket.uid === uid)
    const docketIndex = newTableData.indexOf(docketToUpdate)
    docketToUpdate[fieldName] = inputValue
    newTableData[docketIndex] = docketToUpdate

    this.props.handleChange(newTableData)
  }

  handleDeleteDocket = (uid) => () => {
    const docketToDelete = find(this.props.tableData, (docket) => {return docket.uid === uid})
    const newTableData = without(this.props.tableData, docketToDelete)

    this.props.handleChange(newTableData)
  }

  defaultRowData = (row = {}) => {
    this.props.tableStructure.map(column => {
      row[column.fieldName] = ''
    })
    return row
  }

  createNewRow = () => {
    const uid = uuidv4()
    const emptyDocket = this.defaultRowData({ allowDelete: true, uid: uid })
    let newTableData = this.props.tableData ? this.props.tableData : []
    newTableData.unshift(emptyDocket)

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
            {map(tableData, (docket, index) => {
              return(
                <DocketForm key={`${this.props.id}-row-${docket.uid}`}
                  docket={docket}
                  handleDelete={this.handleDeleteDocket(docket.uid)}
                  handleChange={this.handleChange}
                  classes={this.props.classes}
                />
            )}
          )}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(DocketingTable)
