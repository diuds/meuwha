import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Typography, Drawer, IconButton } from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';

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

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setPropertiesPanelOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.toolbox}>
        <Typography variant="h6" gutterBottom>
          Flow Elements
        </Typography>
        <div className={classes.nodeItem}>
          <Typography>Message Node</Typography>
        </div>
        <div className={classes.nodeItem}>
          <Typography>Condition Node</Typography>
        </div>
        <div className={classes.nodeItem}>
          <Typography>Input Node</Typography>
        </div>
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