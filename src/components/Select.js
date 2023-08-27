import React, { useState, useRef, useEffect } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import IconButton from "@mui/joy/IconButton";
import CloseRounded from "@mui/icons-material/CloseRounded";

export default function SelectBasic({
  options,
  label,
  params,
  dispatchSelectAction,
  defaultValue,
}) {
  const [value, setValue] = useState(null);

  const action = useRef(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Select
      action={action}
      value={value}
      placeholder={label}
      size="sm"
      variant="outlined"
      onChange={(event, newValue) => {
        dispatchSelectAction(params.id, newValue, setValue);
      }}
      {...(value && {
        endDecorator: (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              dispatchSelectAction(params.id, null, setValue);
              action.current?.focusVisible();
            }}
          >
            <CloseRounded />
          </IconButton>
        ),
        indicator: null,
      })}
    >
      {options.map((option) => (
        <Option key={option.id} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
}
