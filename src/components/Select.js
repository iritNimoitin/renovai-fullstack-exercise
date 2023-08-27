import React, { useState, useRef } from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';

export default function SelectBasic(props) {
  const [value, setValue] = useState(null);
  const action = useRef(null);
  const buildOptions = (options) => {
    const allOptions = [];
    for(const option of options) {
        allOptions.push(<Option key={option} value={option}>{option}</Option>)
    }
    return allOptions;
  }
  return (
    <Select
      action={action}
      value={value}
      placeholder={props.label}
      onChange={(e, newValue) => {
        //send request to server
        setValue(newValue)
    }}
      {...(value && {
        // When the user has selected a value, the button is displayed, and the select indicator is removed.
        endDecorator: (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onMouseDown={(event) => {
              // stops the popup from appearing when this button is clicked
              event.stopPropagation();
            }}
            onClick={() => {
                //send request to server
              setValue(null);
              action.current?.focusVisible();
            }}
          >
            <CloseRounded />
          </IconButton>
        ),
        indicator: null,
      })}
    >
        {buildOptions(props.options)}
    </Select>
  );
}