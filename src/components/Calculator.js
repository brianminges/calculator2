import React, {useState} from "react";
import { NumberButton } from "./NumberButton";
import { OperatorButton } from "./OperatorButton";
import "./calculator.css"

export const Calculator = () => {
    const [ current, setCurrent ] = useState("0")
    const [ previous, setPrevious ] = useState("0")
    const [ operator, setOperator ] = useState("")


    const calculate = () => {

    }

    return (
        <>
        <div className="calculator__body">
            <div className="calculator__screen">
                <div className="calculator__screen__previous">
                    {previous}{operator}
                </div>
                <div className="calculator__screen__current">
                    {current}
                </div>
            </div>
            <div className="calculator__buttons">
                <button id="ac">Clear</button>
                <button id="del">Del</button>
                <OperatorButton operator='/'/> 
                <NumberButton value='7'/> 
                <NumberButton value='8'/>  
                <NumberButton value='9'/> 
                <OperatorButton operator='-'/> 
                <NumberButton value='4'/> 
                <NumberButton value='5'/> 
                <NumberButton value='6'/> 
                <OperatorButton operator='*'/> 
                <NumberButton value='1'/> 
                <NumberButton value='2'/> 
                <NumberButton value='3'/> 
                <OperatorButton operator='+'/> 
                <NumberButton value='0'/> 
                <NumberButton value='.'/> 
                <button id="total">=</button>
            </div>
        </div>
        </>
    )
}