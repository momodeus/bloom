/* eslint-disable react/function-component-definition */
import React from 'react';

const TreeListComponent = (props) => {
  if (props.tree.id !== '2q5uA3rO1YnSd7pYXLUK') {
    return (
      <button type="button" className="tree-list-component home-page-button container disabled-button" onClick={props.onSelectDifferentTree}>
        {props.tree.name}
      </button>
    );
  }
  return ( // renders all other buttons as a disabled button
    <button type="button" className="tree-list-component home-page-button container" onClick={props.onSelectDifferentTree}>
      {props.tree.name}
    </button>
  );
};

export default TreeListComponent;