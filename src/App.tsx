import { useState } from "react";
import axios from "axios";
// @ts-ignore
import tokml from "tokml";
function App() {
  // const [inputIndex, setInputIndex] = useState(1);
  const [geoList, setGeoList] = useState([{ city: "", area: "", number: "" }]);

  function handleAddBox(): void {
    // add new inbox with the same value as the last one
    const newGeoList = [...geoList];
    newGeoList.push({
      city: newGeoList[newGeoList.length - 1].city,
      area: newGeoList[newGeoList.length - 1].area,
      number: newGeoList[newGeoList.length - 1].number,
    });
    setGeoList(newGeoList);
    
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(geoList);
    getData();
    console.log("submit");
  }

  function getData(): void {
    var config = {
      method: "get",
      // url: '/index/search?lands[]=臺北市,華興段三小段,141&lands[]=臺北市,華興段三小段,142',
      url: `https://twland.ronny.tw/index/search?${geoList
        .map((geo) => `lands[]=${geo.city},${geo.area},${geo.number}`)
        .join("&")}`,
      headers: {},
    };

    function removeTrailingZeroes(str: string): string {
      return str.replace(/0000$/, "");
    }

    axios(config)
      .then(function (response) {
        let data = response.data as any;
        data = {
          ...data,
          features: data.features.map((feature: any) => {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                name: `${feature.properties.縣市}${feature.properties.鄉鎮}${
                  feature.properties.地段
                }${removeTrailingZeroes(feature.properties.段號.toString())}`,
              },
            };
          }),
        };

        // const data = JSON.stringify(response.data);
        // convert json data to kml
        const kml = tokml(data);
        // var kmlNameDescription = tokml(response.data, {
        //   name: "name",
        //   description: "description",
        // });
        // download kml file
        const element = document.createElement("a");
        const file = new Blob([kml], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "data.kml";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {geoList.map((geo, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="city"
              value={geo.city}
              onChange={(event) => {
                const newGeoList = [...geoList];
                newGeoList[index].city = event.target.value;
                setGeoList(newGeoList);
              }}
            />
            <input
              type="text"
              placeholder="area"
              value={geo.area}
              onChange={(event) => {
                const newGeoList = [...geoList];
                newGeoList[index].area = event.target.value;
                setGeoList(newGeoList);
              }}
            />
            <input
              type="number"
              placeholder="number"
              value={geo.number}
              onChange={(event) => {
                const newGeoList = [...geoList];
                newGeoList[index].number = event.target.value;
                setGeoList(newGeoList);
              }}
            />
          </div>
        ))}
        <input type="submit" value="下載" />
      </form>
      <button onClick={handleAddBox}>+</button>
    </div>
  );
}

export default App;
