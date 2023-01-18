import React, { useState } from "react";
import lingbianDuanList from "./test/lingbian-duan.json";


type Props = {};

type data = {
  duanNumber: string;
  dihao: number[];
};

export default function App({}: Props) {
  const [lingbianDuan, setLingbianDuan] = useState<string>("鎮林段");
  const [inputBox, setInputBox] = useState<number[]>([0]);
  const [data, setData] = useState<data>({ duanNumber: "", dihao: [0] });

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setLingbianDuan(event.target.value);
  }

  function handleChangeNumber(index: number) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputBox = [...inputBox];
      newInputBox[index] = parseInt(event.target.value);
      setInputBox(newInputBox);
    };
  }

  function handleAddNumber(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const newInputBox = [...inputBox];
    newInputBox.push(0);
    setInputBox(newInputBox);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setData({ duanNumber: lingbianDuan, dihao: inputBox });
  }

  function handleRemoveNumber(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const newInputBox = [...inputBox];
    newInputBox.pop();
    setInputBox(newInputBox);
  }



  return (
    <>
      <div>
        <select onChange={handleChange} name="" id="">
          {lingbianDuanList.map((item, index) => (
            <option key={index} value={item.number}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {inputBox.map((item, index) => (
            <div key={index}>
              <input type="number" onChange={handleChangeNumber(index)} />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
        <button onClick={handleAddNumber}>+</button>
        <button onClick={handleRemoveNumber}>-</button>
      </div>
      <div>
        <p>{data.duanNumber}</p>
        <p>{data.dihao}</p>
      </div>
      <div>{converted}</div>
    </>
  );
}
