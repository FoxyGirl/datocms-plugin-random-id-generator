import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import connectToDatoCms from './connectToDatoCms';
import './style.sass';

const MIN_LENGTH = 3;

const getRandomKey = (length) => {
  const keyRand1 = [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join('');

  return keyRand1;
};

const Main = ({
  plugin, idPrefix, minLength = 3, autoGeneration, isUpperCase,
}) => {
  const [adjustedMinLength] = useState(minLength < MIN_LENGTH ? MIN_LENGTH : minLength);
  const fieldValue = plugin.getFieldValue(plugin.fieldPath);

  const generateRandomId = useCallback(() => {
    const randomPart = isUpperCase
      ? getRandomKey(adjustedMinLength).toUpperCase()
      : getRandomKey(adjustedMinLength);

    const randomId = idPrefix ? `${idPrefix}-${randomPart}` : randomPart;

    plugin.setFieldValue(plugin.fieldPath, randomId);
  }, [adjustedMinLength, idPrefix, isUpperCase, plugin]);

  useEffect(() => {
    if (autoGeneration && !fieldValue) {
      generateRandomId();
    }
  }, []);

  return (
    <a href="#generate" className="link" onClick={generateRandomId}>
      Generate
      {' '}
      {plugin.field.attributes.label.toLowerCase()}
    </a>
  );
};

const Wrap = connectToDatoCms(plugin => ({
  plugin,
  idPrefix: plugin.parameters.instance.idPrefix,
  minLength: plugin.parameters.instance.minLength,
  autoGeneration: plugin.parameters.instance.autoGeneration,
  isUpperCase: plugin.parameters.instance.isUpperCase,
}))(Main);

Main.propTypes = {
  plugin: PropTypes.object.isRequired,
  idPrefix: PropTypes.string,
  minLength: PropTypes.number.isRequired,
  autoGeneration: PropTypes.bool.isRequired,
  isUpperCase: PropTypes.bool.isRequired,
};

export default Wrap;
