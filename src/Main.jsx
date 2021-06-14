import React, { useState, useEffect, useCallback } from 'react';
import { SiteClient } from 'datocms-client';
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

const toCamel = s => s.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase()
  .replace('-', '')
  .replace('_', ''));

const Main = ({
  plugin, datoCmsApiToken, idPrefix, minLength = 3, autoGeneration, isUpperCase,
}) => {
  const [loading, setLoading] = useState(false);
  const [shouldAutoGenerate, setShouldAutoGenerate] = useState(false);
  const [adjustedMinLength] = useState(minLength < MIN_LENGTH ? MIN_LENGTH : minLength);

  const checkIsFieldSetted = useCallback(() => {
    setLoading(true);

    const client = new SiteClient(datoCmsApiToken);

    client.items.find(plugin.itemId)
      .then((currentItem) => {
        const convertedApiKey = toCamel(plugin.field.attributes.api_key);
        const currentValue = currentItem[convertedApiKey];

        if (!currentValue) {
          setShouldAutoGenerate(true);
        }
      })
      .catch((error) => {
        console.error(error);
        plugin.notice('An error has occured, please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [plugin, datoCmsApiToken]);

  const generateRandomId = useCallback(() => {
    const randomPart = isUpperCase
      ? getRandomKey(adjustedMinLength).toUpperCase()
      : getRandomKey(adjustedMinLength);

    const randomId = idPrefix ? `${idPrefix}-${randomPart}` : randomPart;

    plugin.setFieldValue(plugin.fieldPath, randomId);
    plugin.notice(`${plugin.field.attributes.label} generated successfully.`);
  }, [adjustedMinLength, idPrefix, isUpperCase, plugin]);

  useEffect(() => {
    if (autoGeneration) {
      if (plugin.itemId) {
        checkIsFieldSetted();
      } else {
        setShouldAutoGenerate(true);
      }
    }
  }, [autoGeneration, checkIsFieldSetted, plugin.itemId]);

  useEffect(() => {
    if (shouldAutoGenerate) {
      generateRandomId();
    }
  }, [shouldAutoGenerate, generateRandomId]);


  return (
    <>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <a href="#generate" className="link" onClick={generateRandomId}>
          Generate
          {' '}
          {plugin.field.attributes.label.toLowerCase()}
        </a>
      )}
    </>
  );
};

const Wrap = connectToDatoCms(plugin => ({
  plugin,
  datoCmsApiToken: plugin.parameters.global.datoCmsApiToken,
  idPrefix: plugin.parameters.instance.idPrefix,
  minLength: plugin.parameters.instance.minLength,
  autoGeneration: plugin.parameters.instance.autoGeneration,
  isUpperCase: plugin.parameters.instance.isUpperCase,
}))(Main);

Main.propTypes = {
  plugin: PropTypes.object.isRequired,
  datoCmsApiToken: PropTypes.string.isRequired,
  idPrefix: PropTypes.string,
  minLength: PropTypes.number.isRequired,
  autoGeneration: PropTypes.bool.isRequired,
  isUpperCase: PropTypes.bool.isRequired,
};

export default Wrap;
