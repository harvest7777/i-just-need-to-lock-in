"use client";
import React, { useState, Fragment } from 'react';
import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';

export default function ManageColors() {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  return (
    <div className="bg-app-fg rounded-2xl p-2 md:w-2/3 w-full flex flex-col space-y-4 pb-10 mt-5">
      <h1 className="text-center text-app-highlight font-bold text-3xl">Colors</h1>
      <Fragment>
        <Wheel width={100} height={100} color={hsva} onChange={(color) => setHsva({ ...hsva, ...color.hsva })} />
        <div style={{ width: '100%', height: 34, marginTop: 20, background: hsvaToHex(hsva) }}></div>
      </Fragment>
      <p>Save</p>
    </div>
  )
}
