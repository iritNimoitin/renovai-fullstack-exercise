import React, { useState, useRef } from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

export default function SelectBasic({options, label, dispatchSelectAction, dispatchUnselectAction}) {
    const dispatch = useDispatch();
  const [value, setValue] = useState(null);


  const action = useRef(null);

  return (
    <Select
      action={action}
      value={value}
      placeholder={label}
      size="sm"
  variant="outlined"
      onChange={(event, newValue) => {
        //send request to server
        // dispatch(props.dispatchSelectAction(newValue));
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
            onClick={(event) => {
                //send request to server
              // dispatch(props.dispatchUnselectAction(value));
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
        {options.map(option=><Option key={option.id} value={option.value}>{option.label}</Option>)}
    </Select>
  );
}