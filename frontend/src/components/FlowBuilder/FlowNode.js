import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from '@material-ui/core';
import { DragHandle, Settings } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: 200,
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    cursor: 'move',
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  dragHandle: {
    cursor: 'move',
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: theme.spacing(1),
  },
  connectionPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.background.paper}`,
    '&.input': {
      top: '50%',
      left: -6,
      transform: 'translateY(-50%)',
    },
    '&.output': {
      top: '50%',
      right: -6,
      transform: 'translateY(-50%)',
    },
  },
}));

const FlowNode = ({ type, title, onSettingsClick }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <DragHandle className={classes.dragHandle} />
        <Typography variant="subtitle1" className={classes.title}>
          {title}
        </Typography>
        <IconButton size="small" onClick={onSettingsClick}>
          <Settings fontSize="small" />
        </IconButton>
      </div>
      <div className={classes.content}>
        <Typography variant="body2" color="textSecondary">
          {type}
        </Typography>
      </div>
      <div className={`${classes.connectionPoint} input`} />
      <div className={`${classes.connectionPoint} output`} />
    </Paper>
  );
};

export default FlowNode;