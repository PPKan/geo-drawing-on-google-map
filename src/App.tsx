import axios from "axios";
import React, { useState } from "react";
import lingbianDuanList from "./test/lingbian-duan.json";
// @ts-ignore
import tokml from "tokml";
type Props = {};

// type data = {
//   duanNumber: string;
//   dihao: number[];
// };

export default function App({}: Props) {
  const [lingbianDuan, setLingbianDuan] = useState<string>("");
  const [inputBox, setInputBox] = useState<number[]>([0]);
  // const [data, setData] = useState<data>({ duanNumber: "", dihao: [0] });
  const [dataType, setDataType] = useState<string>("");

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    getData(lingbianDuan, inputBox);
  }

  async function getData(duanNumber: string, dihao: number[]) {
    const config = {
      method: "get",
      url: `http://localhost:3000?filename=${duanNumber}&dihao=${dihao.toString()}`,
      headers: {},
    };

    axios(config)
      .then(function (response: any) {
        console.log(JSON.stringify(response.data));
        const data = response.data;
        // download json if dataType is json
        if (dataType === "json") {
          const element = document.createElement("a");
          const file = new Blob([JSON.stringify(data)], { type: "text/plain" });
          element.href = URL.createObjectURL(file);
          element.download = "data.json";
          document.body.appendChild(element); // Required for this to work in FireFox
          element.click();
        }
        // download kml if dataType is kml
        else if (dataType === "kml") {
          const kml = tokml(data);
          const element = document.createElement("a");
          const file = new Blob([kml], { type: "text/plain" });
          element.href = URL.createObjectURL(file);
          element.download = "data.kml";
          document.body.appendChild(element); // Required for this to work in FireFox
          element.click();
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
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
          <select onChange={(e) => setDataType(e.target.value)}>
            <option value="json">JSON</option>
            <option value="kml">KML</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        <button onClick={handleAddNumber}>+</button>
        <button onClick={handleRemoveNumber}>-</button>
      </div>
      <button>Download JSON</button>
      <button>Download KML</button>
    </>
  );
}
