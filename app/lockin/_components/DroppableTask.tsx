"use client";

import React from 'react';
import {useDroppable} from '@dnd-kit/core';

interface DroppableTaskProps extends React.PropsWithChildren {
    id: number;
    className: string;
}

const DroppableTask: React.FC<DroppableTaskProps> = ({id, className, ...props}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div className={className} ref={setNodeRef} style={style}>
        {props.children}
    </div>
  );
}
export default DroppableTask;