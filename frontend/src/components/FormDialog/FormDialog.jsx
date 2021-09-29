import React, { useRef, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';


const FormDialog = () => {
    //parsing value

    const first_name = useRef();
    const last_name = useRef();
    const uni_name = useRef();
    const course_name = useRef();

    // const [uninames, setUniNames] = useState([])
    
    // // useEffect(() => {
    // //     const success =  axios.get(//url); 
        
    // //     setUniNames(success.uniname);
    // // }, [])

    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleSubmit = () => {
        axios.put("")
      };
    
    //----------------------------- UNI SELECT -----------------------------------------
    // const ITEM_HEIGHT = 48;
    // const ITEM_PADDING_TOP = 8;
    // const MenuProps = {
    //   PaperProps: {
    //     style: {
    //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    //       width: 250,
    //     },
    //   },
    // };
    

    // const names = [
    //     'University of Canberra',
    //     'Australia National University',
    //     'University of Sydney',
    //   ];
    //   function getStyles(name, personName, theme) {
    //     return {
    //       fontWeight:
    //         personName.indexOf(name) === -1
    //           ? theme.typography.fontWeightRegular
    //           : theme.typography.fontWeightMedium,
    //     };
    //   }
      
    //   const MultipleSelect=()=> {
    //     const theme = useTheme();
    //     const [personName, setPersonName] = React.useState([]);
      
    //     const handleChange = (event) => {
    //       const {
    //         target: { value },
    //       } = event;
    //       setPersonName(
    //         // On autofill we get a the stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //       );
    //     };
      
    //     return (
    //       <div>
    //         <FormControl sx={{ m: 1, width: 300 }}>
    //           <InputLabel id="demo-multiple-name-label">Name</InputLabel>
    //           <Select
    //             labelId="demo-multiple-name-label"
    //             id="demo-multiple-name"
    //             multiple
    //             value={personName}
    //             onChange={handleChange}
    //             input={<OutlinedInput label="Name" />}
    //             MenuProps={MenuProps}
    //           >
    //             {uniNames.map((name) => (
    //               <MenuItem
    //                 key={name}
    //                 value={name}
    //                 style={getStyles(name, personName, theme)}
    //               >
    //                 {name}
    //               </MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
    //       </div>
    //     );
    //   }
    
      //------------------------------------------------------------------------



    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Update Your Info
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
             Let your friends know about you!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              inputRef={first_name}
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              inputRef={last_name}
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              inputRef={last_name}
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            {/* <MultipleSelect/> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
export default FormDialog
