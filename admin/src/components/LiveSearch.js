import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import AutoComplete from '@mui/material/Autocomplete'
import { Box } from '@mui/system';
// import Box from '@mui/material/Box'

const LiveSearch = () => {
    const [jsonResults, setJsonResults] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(res => res.json())
          .then(data => setJsonResults(data))
    }, [])
    console.log(jsonResults)
  return (
    <Stack sx={{width: 300}}>
        <AutoComplete
        id="combo-box-demo"
        options={jsonResults}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label="Search" variant="standard" />}
        />
    </Stack>
  )
}

export default LiveSearch