import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import AboutMenu from './AboutMenu'

export default function ButtonAppBar () {
  const [openAbout, setOpenAbout] = useState(false)

  // Callbacks for about menu
  const onOpenAbout = () => setOpenAbout(true)
  const onCloseAbout = () => setOpenAbout(false)

  return (
    <>
      <AboutMenu open={openAbout} onClose={onCloseAbout}/>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CS573 Survey
            </Typography>
            <Button color="inherit" onClick={onOpenAbout} >About</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
