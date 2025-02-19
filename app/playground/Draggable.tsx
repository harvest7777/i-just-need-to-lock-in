import { useDraggable } from "@dnd-kit/core"
interface DraggableProps extends React.PropsWithChildren {
    id: number;
}
const Draggable:React.FC<DraggableProps> = ({id, ...props}) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id:id
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined;
    return (
        <p className="bg-green-500 w-1/5 p-10" ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </p>
    )
}
export default Draggable;