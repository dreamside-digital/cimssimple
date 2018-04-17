import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Grid from 'material-ui/Grid'
import Input from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

const styles = {
  container: {
    overflowX: 'auto',
    paddingBottom: '1rem'
  },
  table: {
    marginBottom: '1rem'
  },
  input: {
    fontSize: '0.8rem'
  },
  button: {
    marginLeft: '1rem'
  }
}

class EditableTable extends React.Component {
  componentDidMount() {
    if (!this.props.tableData) {
      this.createNewRow()
    }
  }

  handleChange = (fieldName, rowIndex) => event => {
    let newData = [...this.props.tableData];
    const row = newData[rowIndex];
    const newRow = { ...row, [fieldName]: event.target.value }
    newData.splice(rowIndex, 1, newRow)

    this.props.handleChange(newData)
  }

  handleDeleteRow = (rowIndex) => () => {
    let newData = [...this.props.tableData];
    newData.splice(rowIndex, 1)

    this.props.handleChange(newData)
  }

  defaultRowData = (row={}) => {
    this.props.tableStructure.map(column => {
      row[column.fieldName] = '';
    })

    return row;
  }

  createNewRow = () => {
    const emptyRowData = this.defaultRowData();
    let newTableData = this.props.tableData ? [...this.props.tableData] : [];
    newTableData.push(emptyRowData);

    this.props.handleChange(newTableData)
  }

  render() {
    const tableData = this.props.tableData ? this.props.tableData : [];

    return(
          <Paper style={styles.container}>
            <Table style={styles.table}>
              <TableHead>
                <TableRow>
                  {
                    this.props.tableStructure.map(column => (
                      <TableCell key={column.fieldName} padding="dense">{column.header}</TableCell>
                    ))
                  }
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  tableData.map((row, index) => (
                    <TableRow key={`${this.props.id}-row-${index}`}>
                      {
                        map(row, ((item, fieldName) => {
                          return(
                            <TableCell key={`${fieldName}-${item}`} padding="dense">
                              <Input
                                defaultValue={item}
                                onBlur={this.handleChange(fieldName, index)}
                                style={styles.input}
                              />
                            </TableCell>
                          )
                        }))
                      }
                      <TableCell padding="dense">
                        <IconButton aria-label="Delete" onClick={this.handleDeleteRow(index)}>
                          &times;
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
            <Button style={styles.button} onClick={this.createNewRow}>Add new row</Button>
          </Paper>
    );
  }
}


export default EditableTable;