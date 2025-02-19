import React from 'react';
import {useDroppable} from '@dnd-kit/core';

interface DroppableProps extends React.PropsWithChildren {
    id: number;
}

const Droppable: React.FC<DroppableProps> = ({id, ...props}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div className="bg-appFg w-1/5 p-10" ref={setNodeRef} style={style}>
        {props.children}
    </div>
  );
}
export default Droppable;