import { useState, useEffect } from "react";
import { PersonalInformation } from "../interfaces";

const Filter = ({ showedData, setShowedData,data,setStartSorting,startSorting,setShowedIndex }: Filter) => {
  const [minIdNumber, setMinIdNumber] = useState<number>(NaN);
  const [maxIdNumber, setMaxIdNumber] = useState<number>(NaN);
  const [firtsNameFilter, setFirsteNameFilter] = useState<string>("");
  const [lastNameFilter, setLastNameFilter] = useState<string>("");
  const [minDateFilter, setMinDateFilter] = useState<string>("");
  const [maxDateFilter, setMaxDateFilter] = useState<string>("");
  const [functionFilter, setFunctionFilter] = useState<string>("");
  const [minExperienceFilter, setMinExperienceFilter] = useState<number>(NaN);
  const [maxExperienceFilter, setMaxExperienceFilter] = useState<number>(NaN);

  useEffect(() => {
    let arr:Array<PersonalInformation> = JSON.parse(JSON.stringify(data))
    arr = idFilterFunction(arr,minIdNumber,maxIdNumber,"id")
    arr = idFilterFunction(arr,minExperienceFilter,maxExperienceFilter,"experience")
    arr = checkingNameFilterFunction(arr,firtsNameFilter,"firstName")
    arr = checkingNameFilterFunction(arr, lastNameFilter,"lastName")
    arr = checkingNameFilterFunction(arr, functionFilter,"function")
    arr = dateOfBirthFunction(arr,minDateFilter,maxDateFilter)
    setStartSorting(!startSorting)
    setShowedData(arr)
    setShowedIndex(0)
    

  }, [
    minIdNumber,
    maxIdNumber,
    firtsNameFilter,
    lastNameFilter,
    minDateFilter,
    maxDateFilter,
    functionFilter,
    minExperienceFilter,
    maxExperienceFilter,
  ]);

  const dateOfBirthFunction=(arr:Array<PersonalInformation>,min:string,max:string)=>{
    console.log(min)
    console.log(max)
    if(min===""&&max===""){
        return arr
    }else if(max==="") {
        const tab:Array<PersonalInformation> = []
        const minDate = new Date(min)
        const minDay = minDate.getDate()
        const minMonth = minDate.getMonth()+1
        const minYear = minDate.getFullYear()
        arr.map(ele=>{
            const date = ele.dateOfBirth.split(".")
            const checkDay = Number(date[0])
            const checkMonth = Number(date[1])
            const checkYear = Number(date[2].split(" ")[0])
            const flag = minDateCompare(minDay,minMonth,minYear,checkDay,checkMonth,checkYear)
            if(flag){
                tab.push(ele)
            }
        })
        return tab
        //arr.map(ele=>console.log(ele.dateOfBirth,new Date( ele.dateOfBirth)))
        //return arr.filter(ele=>minDate<=new Date(ele.dateOfBirth))
    }else if(min===""){
        const tab:Array<PersonalInformation> = []
        const maxDate = new Date(max)
        const maxDay = maxDate.getDate()
        const maxMonth = maxDate.getMonth()+1
        const maxYear = maxDate.getFullYear()
        arr.map(ele=>{
            const date = ele.dateOfBirth.split(".")
            const checkDay = Number(date[0])
            const checkMonth = Number(date[1])
            const checkYear = Number(date[2].split(" ")[0])
            const flag = maxDateCompare(maxDay,maxMonth,maxYear,checkDay,checkMonth,checkYear)
            if(flag){
                tab.push(ele)
            }
        })
        return tab
    }else{
        const tab:Array<PersonalInformation> = []
        const minDate = new Date(min)
        const minDay = minDate.getDate()
        const minMonth = minDate.getMonth()+1
        const minYear = minDate.getFullYear()

        const maxDate = new Date(max)
        const maxDay = maxDate.getDate()
        const maxMonth = maxDate.getMonth()+1
        const maxYear = maxDate.getFullYear()

        arr.map(ele=>{
            const date = ele.dateOfBirth.split(".")
            const checkDay = Number(date[0])
            const checkMonth = Number(date[1])
            const checkYear = Number(date[2].split(" ")[0])
            const flag1 = minDateCompare(minDay,minMonth,minYear,checkDay,checkMonth,checkYear)
            const flag2 = maxDateCompare(maxDay,maxMonth,maxYear,checkDay,checkMonth,checkYear)
            if(flag1&&flag2){
                tab.push(ele)
            }
        })

        return tab
    }
  }

  const maxDateCompare=(maxDay:number,maxMonth:number,maxYear:number,checkDay:number,checkMonth:number,checkYear:number)=>{
    if(checkYear<maxYear){
        return true
    }else if(checkYear===maxYear){
        if(checkMonth<maxMonth){
            return true
        }else if(checkMonth===maxMonth){
            if(checkDay<=maxDay){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }else{
        return false
    }
  }




  const minDateCompare=(minDay:number,minMonth:number,minYear:number,checkDay:number,checkMonth:number,checkYear:number)=>{
    if(checkYear>minYear){
        return true
    }else if(checkYear===minYear){
        if(checkMonth>minMonth){
            return true
        }else if(checkMonth===minMonth){
            if(checkDay>=minDay){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }else{
        return false
    }
  }


  const checkingNameFilterFunction=(arr:Array<PersonalInformation>,checkingName:string, keyValue: "firstName"|"lastName"|"function")=>{
    let table:Array<PersonalInformation> = []
    arr.map(ele=>{
        let flag = true
        for(let i = 0;i<checkingName.length;i++){
            if(ele[keyValue][i]!==checkingName[i]){
                flag = false
            }
        }
        if(flag){
            table.push(ele)
        }
    })
    return table
  }

  const idFilterFunction=(arr:Array<PersonalInformation>,min:number,max:number,key:"id"|"experience")=>{
    if(Number.isNaN(min)&&Number.isNaN(max)){
        return arr
    }else if(Number.isNaN(max)){
        return arr.filter(ele=>ele[key]>=min)
    }else if (Number.isNaN(min)){
        return arr.filter(ele=>ele[key]<=max)
    }else{
        return arr.filter(ele=>ele[key]>=min&&ele[key]<=max)
    }
  }

  return (
    <div className="Filter">
      <table>
        <tr>
          <th>ID:</th>
          <td>
            <input
              value={minIdNumber}
              onChange={(e) => {
                const target = e.nativeEvent.target as HTMLInputElement;
                setMinIdNumber(parseInt(target.value));
              }}
              type="number"
              placeholder="ID from"
            />
          </td>
          <td>
            -
            <input
              type="number"
              value={maxIdNumber}
              onChange={(e) => {
                const target = e.nativeEvent.target as HTMLInputElement;
                setMaxIdNumber(parseInt(target.value));
              }}
              placeholder="ID to"
            />
          </td>
        </tr>
        <tr>
          <th>First name:</th>
          <td>
            <input
              type="text"
              value={firtsNameFilter}
              onChange={(e) => {
                const target = e.nativeEvent.target as HTMLInputElement;
                setFirsteNameFilter(target.value);
              }}
              placeholder="First name"
            />
          </td>
        </tr>
        <tr>
          <th>Last name:</th>
          <td>
            <input
              type="text"
              value={lastNameFilter}
              onChange={(e) => {
                const target = e.nativeEvent.target as HTMLInputElement;
                setLastNameFilter(target.value);
              }}
              placeholder="Last name"
            />
          </td>
        </tr>
        <tr>
          <th>Date of birth:</th>
          <td>
            <input
              type="date"
              value={minDateFilter}
              onChange={(e) => {
                const target = e.nativeEvent.target as HTMLInputElement;
                setMinDateFilter(target.value);
              }}
            />
          </td>
          <td>
            -
            <input
              type="date"
              value={maxDateFilter}
              onChange={(e) => {
                const target = e.nativeEvent.target as HTMLInputElement;
                setMaxDateFilter(target.value);
              }}
            />
          </td>
        </tr>
        <tr>
          <th>Function:</th>
          <td>
            <input
              type="text"
              value={functionFilter}
              onChange={(e) => {
                const target = e.nativeEvent.target as HTMLInputElement;
                setFunctionFilter(target.value);
              }}
              placeholder="Function"
            />
          </td>
        </tr>
        <tr>
          <th>Experience:</th>
          <td>
            <input
              type="number"
              value={minExperienceFilter}
              onChange={(e) => {
                const target = e.nativeEvent.target as HTMLInputElement;
                setMinExperienceFilter(parseInt(target.value));
              }}
              placeholder="Experience from"
            />
          </td>
          <td>
            -
            <input
              type="number"
              value={maxExperienceFilter}
              onChange={(e) => {
                const target = e.nativeEvent.target as HTMLInputElement;
                setMaxExperienceFilter(parseInt(target.value));
              }}
              placeholder="Experience to"
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Filter;

interface Filter {
  showedData: Array<PersonalInformation>;
  setShowedData: React.Dispatch<React.SetStateAction<PersonalInformation[]>>;
  data:Array<PersonalInformation>
  startSorting:boolean
  setStartSorting:React.Dispatch<React.SetStateAction<boolean>>
  setShowedIndex:React.Dispatch<React.SetStateAction<number>>
}
