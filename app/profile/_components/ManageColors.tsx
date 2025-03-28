"use client";
import ChangeColor from './ChangeColor';
import { defaultColors } from '@/app/ThemeProvider';
import { darkColors } from '@/app/ThemeProvider';

export default function ManageColors() {
  const loadDefault = () => {
    for (const colorData of defaultColors) {
      localStorage.setItem(colorData.cssVariableName, colorData.defaultValue);
      location.reload();
    }
  }

  const loadDark = () => {
    for (const colorData of darkColors) {
      localStorage.setItem(colorData.cssVariableName, colorData.defaultValue);
      location.reload();
    }
  }
  return (
    <div className="bg-app-fg rounded-2xl p-2 md:w-2/3 w-full flex flex-col space-y-4 pb-10">
      <h1 className="text-center text-app-highlight font-bold text-3xl">Colors</h1>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 place-items-center items-start gap-x-2 gap-y-8">
        <button onClick={() => loadDefault()} className="btn-hover bg-app-bg rounded-xl" style={{ width: 200 }}>Load Defaults</button>
        <button onClick={() => loadDark()} className="btn-hover bg-app-bg rounded-xl" style={{ width: 200 }}>Load Dark</button>
        <ChangeColor displayName='Highlight' cssVariable='app-highlight' defaultColor='#009966' />
        <ChangeColor displayName='Foreground' cssVariable='app-fg' defaultColor='#f9fbfc' />
        <ChangeColor displayName='Background' cssVariable='app-bg' defaultColor='#d7dde1' />
        <ChangeColor displayName='Text' cssVariable='app-text' defaultColor='#272672' />
      </div>
    </div>
  )
}
