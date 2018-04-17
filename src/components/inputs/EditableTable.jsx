import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

const styles = {
  root: {
    overflowX: 'auto',
  }
}

class EditableTable extends React.Component {
  state = {}

  handleChange = (fieldName, rowIndex) => event => {
    let newData = [...this.props.tableData];
    const row = newData[rowIndex];
    const newRow = { ...row, [fieldName]: event.target.value }
    newData.splice(rowIndex, 1, newRow)

    this.props.handleChange(newData)
  }

  defaultRowData = (row={}) => {
    this.props.tableStructure.map(column => {
      row[column.fieldName] = '';
    })

    return row;
  }

  render() {

    return(
      <Grid container>
        <Grid item xs={12} style={styles.root}>
          <Table>
            <TableHead>
              <TableRow>
                {
                  this.props.tableStructure.map(column => (
                    <TableCell key={column.fieldName}>{column.header}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.tableData &&
                this.props.tableData.map((row, index) => (
                  <TableRow key={`${this.props.id}-row-${index}`}>
                    {
                      map(row, ((item, fieldName) => {
                        return(
                          <TableCell key={`${fieldName}-${item}`}>
                            <TextField
                              defaultValue={item}
                              onChange={this.handleChange(fieldName, index)}
                              margin="normal"
                            />
                          </TableCell>
                        )
                      }))
                    }
                  </TableRow>
                ))
              }
              {
                !this.props.tableData &&
                <TableRow key={`empty-row`}>
                  {
                    map(this.defaultRowData(), ((item, fieldName) => {
                      return(
                        <TableCell key={`${fieldName}-${item}`}>
                          <TextField
                            defaultValue={item}
                            onChange={this.handleChange(fieldName, 0)}
                            margin="normal"
                          />
                        </TableCell>
                      )
                    }))
                  }
                </TableRow>
              }
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}


export default EditableTable;