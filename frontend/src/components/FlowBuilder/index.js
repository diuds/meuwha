import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Typography, Drawer, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { Settings as SettingsIcon, Add as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  canvas: {
    flex: 1,
    padding: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  toolbox: {
    width: 250,
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto',
  },
  propertiesPanel: {
    width: 300,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  nodeItem: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    cursor: 'grab',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const FlowBuilder = () => {
  const classes = useStyles();
  const [selectedNode, setSelectedNode] = useState(null);
  const [propertiesPanelOpen, setPropertiesPanelOpen] = useState(false);
  const [newFlowDialogOpen, setNewFlowDialogOpen] = useState(false);
  const [newFlowName, setNewFlowName] = useState('');
  const [customBlockDialogOpen, setCustomBlockDialogOpen] = useState(false);
  const [customBlockName, setCustomBlockName] = useState('');

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setPropertiesPanelOpen(true);
  };

  const handleNewFlow = () => {
    if (newFlowName.trim()) {
      // TODO: Implement flow creation logic
      console.log('Creating new flow:', newFlowName);
      setNewFlowName('');
      setNewFlowDialogOpen(false);
    }
  };

  const handleNewCustomBlock = () => {
    if (customBlockName.trim()) {
      // TODO: Implement custom block creation logic
      console.log('Creating custom block:', customBlockName);
      setCustomBlockName('');
      setCustomBlockDialogOpen(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.toolbox}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Flow Elements</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setNewFlowDialogOpen(true)}
          >
            New Flow
          </Button>
        </Box>
        <div className={classes.nodeItem}>
          <Typography>Message Node</Typography>
        </div>
        <div className={classes.nodeItem}>
          <Typography>Condition Node</Typography>
        </div>
        <div className={classes.nodeItem}>
          <Typography>Input Node</Typography>
        </div>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setCustomBlockDialogOpen(true)}
          >
            Create Custom Block
          </Button>
        </Box>

        <Dialog open={newFlowDialogOpen} onClose={() => setNewFlowDialogOpen(false)}>
          <DialogTitle>Create New Flow</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Flow Name"
              fullWidth
              value={newFlowName}
              onChange={(e) => setNewFlowName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewFlowDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleNewFlow} color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={customBlockDialogOpen} onClose={() => setCustomBlockDialogOpen(false)}>
          <DialogTitle>Create Custom Block</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Block Name"
              fullWidth
              value={customBlockName}
              onChange={(e) => setCustomBlockName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCustomBlockDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleNewCustomBlock} color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Paper className={classes.canvas}>
        {/* Canvas content will be implemented with a flow visualization library */}
        <Box position="absolute" right={16} top={16}>
          <IconButton onClick={() => setPropertiesPanelOpen(true)}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Paper>

      <Drawer
        anchor="right"
        open={propertiesPanelOpen}
        onClose={() => setPropertiesPanelOpen(false)}
        variant="persistent"
      >
        <div className={classes.propertiesPanel}>
          <Typography variant="h6" gutterBottom>
            Properties
          </Typography>
          {selectedNode ? (
            <Typography>Selected Node Properties</Typography>
          ) : (
            <Typography>Select a node to edit properties</Typography>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default FlowBuilder;