import React, {useEffect, useState} from "react";
import { NumberButton } from "./NumberButton";
import { OperatorButton } from "./OperatorButton";
import "./calculator.css"



export const Calculator = () => {
    const [ current, setCurrent ] = useState("")
    const [ previous, setPrevious ] = useState("")
    const [ operator, setOperator ] = useState("")
    const [ result, setResult ] = useState("")
    const [ test, setTest ] = useState("")

    let number = ""
    const setNumber = (value) => {
        if (!operator) {
            // Sets first number in equation and allows for multi-digit numbers
            number = current + value
            setCurrent(number)
        }

        // Sets second number in equation and allows for multi-digit numbers
        if (operator) {
            number = test + value
            setTest(number)
        }
    }


    // useEffect(() => {
    //     console.log('test', test)
    // }, [test])

    // useEffect(() => {
    //     console.log('current', current)
    // }, [current])

    // useEffect(() => {
    //     console.log('previous', previous)
    // }, [previous])



    const setOperation = (operator) => {
        setOperator(operator)
    }

    const calculate = () => {
        if (operator === '/') {
            const quotient = current/test
            setResult(quotient)
            //Takes result and moves to 'current' to allow process to continue with result as the starting number. Also resets test and operator to make clear display. 
            setCurrent(quotient)
            setTest("")
            setOperator("")
        }
        if (operator === '-') {
            const difference = current - test
            setResult(difference)
            setCurrent(difference)
            setTest("")
            setOperator("")
        }
        if (operator === '*') {
            let product = (current * test) * 100
            product = product/100
            setResult(product)
            setCurrent(product)
            setTest("")
            setOperator("")
        }
        if (operator === '+') {
            let decimalPlaces = ""
            let sum = (parseFloat(current) + parseFloat(test)) * 100 

            if (current.includes('.') && test.includes('.')) {
                const currentSplit = current.split('.')
                let currentDecimals = currentSplit[1].length
                const testSplit = test.split('.')
                let testDecimals = testSplit[1].length
                if (currentDecimals >= testDecimals) {
                    decimalPlaces = currentDecimals
                } else {
                    decimalPlaces = testDecimals
                }
            } else if (current.includes('.')) {
                let currentSplit = current.split('.')
                decimalPlaces = currentSplit[1].length
            } else if (test.includes('.')) {
                let testSplit = test.split('.')
                decimalPlaces = testSplit[1].length
            }
            sum = (sum/100).toFixed(decimalPlaces)
            setResult(sum)
            setCurrent(sum)
            setTest("")
            setOperator("")
        }
    }

    const clear = () => {
        setCurrent("")
        // setPrevious("")
        setOperator("")
        setResult("")
        setTest("")
    }


    const equationDisplay = () => {
        if (test && operator === '/' || operator === '-' || operator === '+' || operator === '*') {
            return `${current} ${operator} ${test}`
        } else {
            return `${current || '-'} ${operator}`
        }

    }

    return (
        <>
        <div className="calculator__body">
            <div className="calculator__screen">
                <div className="calculator__screen__previous">
                   {equationDisplay()}
                </div>
                <div className="calculator__screen__current">
                    {result}
                </div>
            </div>
            <div className="calculator__buttons">
                <button onClick={() => clear()}id="ac">Clear</button>
                <button id="del">Del</button>
                <button onClick={() => setOperation('/')} className="calculator__operator">/</button>
                <button onClick={() => setNumber('7')} className="calculator__button">7</button>
                <button onClick={() => setNumber('8')} className="calculator__button">8</button>
                <button onClick={() => setNumber('9')} className="calculator__button">9</button>
                <button onClick={() => setOperation('-')} className="calculator__operator">–</button>
                <button onClick={() => setNumber('4')} className="calculator__button">4</button>
                <button onClick={() => setNumber('5')} className="calculator__button">5</button>
                <button onClick={() => setNumber('6')} className="calculator__button">6</button>
                <button onClick={() => setOperation('*')} className="calculator__operator">*</button>
                <button onClick={() => setNumber('1')} className="calculator__button">1</button>
                <button onClick={() => setNumber('2')} className="calculator__button">2</button>
                <button onClick={() => setNumber('3')} className="calculator__button">3</button>
                <button onClick={() => setOperation('+')} className="calculator__operator">+</button>
                <button onClick={() => setNumber('0')} className="calculator__button">0</button>
                <button onClick={() => setNumber('.')} className="calculator__button">.</button>
                <button onClick={() => calculate()} id="total">=</button>
                {/* <OperatorButton operator='/'/> 
                <NumberButton value='7' setCurrent={setCurrent}/> 
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
                <NumberButton value='.'/>  */}
                
            </div>
        </div>
        </>
    )
}