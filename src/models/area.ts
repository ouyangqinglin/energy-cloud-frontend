import React, { useReducer } from 'react';

export type AreaType = {
  id: string;
  parentId: string;
  label: string;
  children: AreaType[];
};

export type AreaDataType = AreaType[];

const useStationModel = () => {
  const initState: AreaDataType = [];

  const reducer = (state: AreaDataType, action: { payload: AreaDataType; type?: string }) => {
    if (action.payload) {
      return action.payload;
    } else {
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  return {
    state,
    dispatch,
  };
};

export default useStationModel;
