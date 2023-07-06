import { useState } from "react";
import "./App.css";
import importedData from "./data/służba.json";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import { PersonalInformation } from "./interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faArrowRight,faArrowLeft} from "@fortawesome/free-solid-svg-icons"


const App = () => {
  const data:Array<PersonalInformation> = importedData;
  const [showedData, setShowedData] = useState<Array<PersonalInformation>>(data);
  const [startSorting,setStartSorting] = useState(false)
  const [showedIndex,setShowedIndex] = useState(0)

  return (
    <div className="App">
      <h1>Służba w zamku Pięknej i Bestii</h1>
      <div className="App_filter" >
        <h2>Filter</h2>
        <Filter setShowedIndex={setShowedIndex} startSorting={startSorting} setStartSorting={setStartSorting} showedData={showedData} setShowedData={setShowedData} data={data} />
      </div>
      <div className="App_sort" >
        <h2>Sort</h2>
        <Sort showedData={showedData} setShowedData={setShowedData} startSorting={startSorting} />
      </div>
      <div>
        <table >
          <tr className="App__tableHeader" >
            <th className="App__tableCell" >ID</th>
            <th className="App__tableCell">First name</th>
            <th className="App__tableCell">Last name</th>
            <th className="App__tableCell">Date of birth</th>
            <th className="App__tableCell">Function</th>
            <th className="App__tableCell">Experience</th>
          </tr>
          {showedData.map((ele,index) => {
            console.log(showedIndex)
            if(index>=showedIndex&&index<(showedIndex+5)){
              let className="App__tableOdd"
              if(index%2===0){
                className="App__tableEven"
              }
              return(
                <tr key={ele.id} className={className} >
                  <td className="App__tableCell">{ele.id}</td>
                  <td className="App__tableCell">{ele.firstName}</td>
                  <td className="App__tableCell">{ele.lastName}</td>
                  <td className="App__tableCell">{ele.dateOfBirth}</td>
                  <td className="App__tableCell">{ele.function}</td>
                  <td className="App__tableCell">{ele.experience}</td>
                </tr>
              )
            }
            
            })}
        </table>
        <div className="App__pager">
            {showedIndex!==0?<button onClick={()=>setShowedIndex(showedIndex-5)} ><FontAwesomeIcon icon={faArrowLeft} /></button>:<div></div>}
            {(showedIndex+5)<showedData.length-1?<button onClick={()=>setShowedIndex(showedIndex+5)} ><FontAwesomeIcon icon={faArrowRight} /></button>:<div></div>}
        </div>
      </div>
    </div>
  );
};

export default App;
