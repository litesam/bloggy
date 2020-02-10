import React from 'react';

export function replaceComponentRenderer({ props, loader }) {
  return React.createElement(props.pageResources.component, {
    ...props,
  });
}

require('./src/utils/prism-dracul.css');
