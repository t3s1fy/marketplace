import React, { useEffect, useState } from "react";

export const useValidation = (value, validations, otherValue) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [matchError, setMatchError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isEmail":
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case "isMatch":
          value === otherValue ? setMatchError(false) : setMatchError(true);
          break;
      }
    }
  }, [value, otherValue]);

  useEffect(() => {
    if (
      isEmpty ||
      maxLengthError ||
      minLengthError ||
      emailError ||
      matchError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError, matchError]);

  return {
    isEmpty,
    minLengthError,
    emailError,
    maxLengthError,
    matchError,
    inputValid,
  };
};

export const useInput = (initialValue, validations, otherValue = null) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations, otherValue);

  useEffect(() => {
    // Перезапуск валидации при изменении otherValue
    valid.otherValue = otherValue;
  }, [otherValue]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const Validation = () => {};

export default Validation;
