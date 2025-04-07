import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const FlowNodeSettings = ({ node, onSave }) => {
  const classes = useStyles();
  const [settings, setSettings] = React.useState(node?.settings || {});

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.value,
    });
  };

  const handleSave = () => {
    onSave(settings);
  };

  const renderMessageSettings = () => (
    <>
      <FormControl className={classes.formControl}>
        <TextField
          label="Message Text"
          multiline
          rows={4}
          value={settings.messageText || ''}
          onChange={handleChange('messageText')}
          variant="outlined"
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Message Type</InputLabel>
        <Select
          value={settings.messageType || 'text'}
          onChange={handleChange('messageType')}
          variant="outlined"
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="quick_reply">Quick Reply</MenuItem>
          <MenuItem value="button">Button</MenuItem>
        </Select>
      </FormControl>
    </>  
  );

  const renderConditionSettings = () => (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Condition Type</InputLabel>
        <Select
          value={settings.conditionType || 'keyword'}
          onChange={handleChange('conditionType')}
          variant="outlined"
        >
          <MenuItem value="keyword">Keyword Match</MenuItem>
          <MenuItem value="regex">Regular Expression</MenuItem>
          <MenuItem value="variable">Variable Check</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Condition Value"
          value={settings.conditionValue || ''}
          onChange={handleChange('conditionValue')}
          variant="outlined"
        />
      </FormControl>
    </>
  );

  const renderInputSettings = () => (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Input Type</InputLabel>
        <Select
          value={settings.inputType || 'text'}
          onChange={handleChange('inputType')}
          variant="outlined"
        >
          <MenuItem value="text">Text Input</MenuItem>
          <MenuItem value="number">Number Input</MenuItem>
          <MenuItem value="options">Options Selection</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Variable Name"
          value={settings.variableName || ''}
          onChange={handleChange('variableName')}
          variant="outlined"
          helperText="Name to store the input value"
        />
      </FormControl>
    </>
  );

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        {node?.type} Settings
      </Typography>
      
      {node?.type === 'message' && renderMessageSettings()}
      {node?.type === 'condition' && renderConditionSettings()}
      {node?.type === 'input' && renderInputSettings()}

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSave}
      >
        Save Settings
      </Button>
    </div>
  );
};

export default FlowNodeSettings;