import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


const SimpleTable = (props) => {

  return (
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
  );
}


export default SimpleTable;