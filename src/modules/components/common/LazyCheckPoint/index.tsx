/* eslint-disable @typescript-eslint/no-explicit-any */
import { Callback } from '@shared';
import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Waypoint } from 'react-waypoint';

const LazyCheckPoint: React.FC<PropsWithChildren<Props>> = ({
  children,
  onFirstEnter,
  refreshValue = null,
}) => {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (refreshValue) {
      setEntered(false);
    }
  }, [refreshValue]);

  const handleEnterView = (args: any) => {
    if (!entered) {
      onFirstEnter(args);
      setEntered(true);
    }
  };
  return <Waypoint onEnter={handleEnterView}>{children}</Waypoint>;
};

type Props = {
  onFirstEnter: Callback;
  refreshValue?: any;
};

export default LazyCheckPoint;
