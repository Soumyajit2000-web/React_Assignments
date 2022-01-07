import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


function Centers({ centers }) {

  const classes = useStyles();

  console.log(centers)

  return (
    <div>
      <TableContainer component={Paper} style={{width: "100%", overflowX: "scroll"}}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Center Name</StyledTableCell>
              <StyledTableCell align="right">Pincode</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Fees</StyledTableCell>
              <StyledTableCell align="right">Dose 1</StyledTableCell>
              <StyledTableCell align="right">Dose 2</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {centers.map((row) => (
              <StyledTableRow key={row.center_id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.pincode}</StyledTableCell>
                <StyledTableCell align="right">{row.address}</StyledTableCell>
                <StyledTableCell align="right">{row.fee_type}</StyledTableCell>
                <StyledTableCell align="right">{row.available_capacity_dose1}</StyledTableCell>
                <StyledTableCell align="right">{row.available_capacity_dose2}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Centers
