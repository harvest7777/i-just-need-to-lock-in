"use client";

import { useDraggable } from "@dnd-kit/core";

interface DraggableTaskProps extends React.PropsWithChildren {
    id:number;
    className: string;
}
const DraggableTask:React.FC<DraggableTaskProps> = ({id,className, ...props}) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id:id
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
        padding:"1px 3px",
        borderRadius:"10px",
        outline:"2px dashed gray",
      } : undefined;
    return (
        <div className={className} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </div>
    )
}
export default DraggableTask;