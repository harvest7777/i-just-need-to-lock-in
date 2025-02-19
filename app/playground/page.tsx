"use client";
import React, {useState} from 'react';
import {DndContext, DragEndEvent} from '@dnd-kit/core';

import Droppable from './Droppable';
import Draggable from './Draggable';

export default function Playground() {
  const groups= {
    1:"some group",
    2:"hello!",
    3:"ahhh"
  }
  const tasks = {
    0:"some task",
    1:"another task"
  }
  return (
    <DndContext onDragEnd={handleDragEndEvent}>
      {Object.entries(groups).map(([id, name]) => (
        <Droppable id={Number(id)}>
          {name}
        </Droppable>
      ))}
      {Object.entries(tasks).map(([id, name]) => (
        <Draggable id={Number(id)}>
          {name}
        </Draggable>
      ))}
    </DndContext>
  )
}

function handleDragEndEvent(event: DragEndEvent) {
  const over = event.over;
  const active = event.active;
}