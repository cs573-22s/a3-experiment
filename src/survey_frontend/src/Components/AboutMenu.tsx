import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type AboutMenuProps = {
    open: boolean,
    onClose: () => void
}

export default function AboutMenu ({ open, onClose } : AboutMenuProps) {
  return (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            CS573 Survey App v0.0.1
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            Frontend written by James Plante and Alicia Howell-Munson, 2022
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}
