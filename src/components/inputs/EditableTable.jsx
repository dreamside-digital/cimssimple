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

const EditableTable = (props) => {

  const tableStructure = [
    { header: 'Name', type: 'text', fieldName: 'name' },
    { header: 'Resource / Partner', type: 'boolean', fieldName: 'resourceType' },
    { header: 'Contact', type: 'email', fieldName: 'contact' },
  ]

  const tableData = [
    { name: 'Sharon', resourceType: 'Partner', contact: 'sharon@nomadiclabs.ca' },
    { name: 'Sharon', resourceType: 'Resource', contact: 'sharon@nomadiclabs.ca' }
  ]

  const handleChange = fieldName => event => {
    console.log(fieldName)
    console.log(event.target.value)
  }

  return (
    <Grid container>
      <Grid item xs={12} style={styles.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Resource / Partner</TableCell>
              <TableCell>Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tableData.map((row, index) => {

              })
            }
            <TableRow>
              <TableCell>
                <TextField
                  defaultValue="Sharon"
                  onChange={handleChange('name')}
                  margin="normal"
                />
              </TableCell>
              <TableCell>
                <TextField
                  defaultValue="Partner"
                  onChange={handleChange('resourceType')}
                  margin="normal"
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="email"
                  defaultValue="sharon@gmail.com"
                  onChange={handleChange('contact')}
                  margin="normal"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}


export default EditableTable;