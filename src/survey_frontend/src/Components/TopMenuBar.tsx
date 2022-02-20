import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'

import AboutMenu from './AboutMenu'

type ButtonAppBarProps = {
  back?: boolean
  onBack?: () => void
}

export default function ButtonAppBar ({ back, onBack } : ButtonAppBarProps) {
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
            {
              (back)
                ? (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={onBack}
                  sx={{ mr: 2 }}
                >
                  <ArrowBackIcon />
                </ IconButton >
                  )
                : undefined
            }
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
