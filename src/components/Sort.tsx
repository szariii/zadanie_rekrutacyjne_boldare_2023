import { useEffect, useState } from "react"
import { PersonalInformation } from "../interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import "../styles/sort.css"

const Sort = ({showedData,setShowedData,startSorting}:Sort)=>{
    const [selectOption,setSelectOption] = useState<"id"|"firstName"|"lastName"|"dateOfBirth"|"function"|"experience">("id")
    const [sortUp,setSortUp] = useState(false)


    useEffect(()=>{
        console.log("no siema data")
        if(selectOption!=="dateOfBirth"){
            //setShowedData
            const copy:Array<PersonalInformation> = JSON.parse(JSON.stringify(showedData))
            copy.sort((a,b)=>(a[selectOption]>b[selectOption])?1:-1)

            if(!sortUp){
                copy.reverse()
            }


            setShowedData(copy)
        }else{
            const tab:Array<TableToCompareByDate> =[]
            showedData.map(ele=>{
                const dataArr = ele.dateOfBirth.split(".")
                const obj={
                    time:{
                        d:parseInt(dataArr[0]),
                        mt:parseInt(dataArr[1]),
                        y:parseInt(dataArr[2].split(" ")[0]),
                        h:parseInt(dataArr[2].split(" ")[1].split(":")[0]),
                        mi:parseInt(dataArr[2].split(" ")[1].split(":")[1])
                    },
                    data:ele
                }
                tab.push(obj)
            })
            
            tab.sort((a,b)=>(a.time.y>b.time.y)?1:(a.time.y!==b.time.y)?-1:(a.time.mt>b.time.mt)?1:(a.time.mt!==b.time.mt)?-1:(a.time.d>b.time.d)?1:(a.time.d!==b.time.d)?-1:(a.time.h>b.time.h)?1:(a.time.h!==b.time.h)?-1:(a.time.mi>b.time.mi)?1:-1)

            const orginalArray:Array<PersonalInformation> = []
            tab.map(ele=>{
                orginalArray.push(ele.data)
            })

            if(sortUp){
                orginalArray.reverse()
            }

            setShowedData(orginalArray)
        }
    },[startSorting,sortUp,selectOption])


    const selectChangehandler=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const val = e.target.value as "id"|"firstName"|"lastName"|"dateOfBirth"|"function"|"experience"
        setSelectOption(val)
    }

    return(
        <div className="sort" >
            <select onChange={(e)=>selectChangehandler(e)} >
                <option value={"id"} >ID</option>
                <option value={"firstName"} >First name</option>
                <option value={"lastName"} >Last name</option>
                <option value={"dateOfBirth"} >Date of birth</option>
                <option value={"function"} >Function</option>
                <option value={"experience"} >Experience</option>
            </select>
            <button onClick={()=>setSortUp(!sortUp)} >{sortUp?(<>ascending <FontAwesomeIcon icon={faArrowUp} /></>):(<>descending <FontAwesomeIcon icon={faArrowDown} /></>)}</button>
        </div>
    )

}

export default Sort

interface Sort{
    showedData:Array<PersonalInformation>
    setShowedData:React.Dispatch<React.SetStateAction<PersonalInformation[]>>
    startSorting:boolean
}

interface TableToCompareByDate{
    time:{
        d:number,
        mt:number,
        y:number,
        h:number
        mi:number
    },
    data:PersonalInformation
}