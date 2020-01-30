import React from 'react';

export function replaceComponentRenderer({ props, loader }) {
  return React.createElement(props.pageResources.component, {
    ...props,
  });
}