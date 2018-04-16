import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Grid from 'material-ui/Grid'

const styles = {
  root: {
    overflowX: 'auto',
  }
}

const BasicTable = (props) => {

  return (
    <Grid container>
      <Grid item xs={12} style={styles.root}>
        <Table>
          <TableHead>
            <TableRow>
              {
                props.tableHeaders.map(header => {
                  return <TableCell key={header}>{header}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
          {
            props.tableData &&
            props.tableData.map((row, index) => {
              return (
                <TableRow key={`row-${index}`}>
                  {
                    map(row, (rowValue, rowKey) => {
                      return <TableCell key={rowKey}>{rowValue}</TableCell>
                    })
                  }
                </TableRow>
              );
            })
          }
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}


export default BasicTable;