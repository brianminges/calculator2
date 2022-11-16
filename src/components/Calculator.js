import React, {useEffect, useState} from "react";
import { NumberButton } from "./NumberButton";
import { OperatorButton } from "./OperatorButton";
import "./calculator.css"

export const Calculator = () => {
    const [ first, setFirst ] = useState("")
    const [ second, setSecond ] = useState("")
    const [ operator, setOperator ] = useState("")
    const [ result, setResult ] = useState("")

    let number = ""
    const setNumber = (value) => {
        if (!operator) {
            // Sets first number in equation, prevents multiple decimal points and allows for multi-digit numbers
            if (first.includes('.') && value === '.') {
                number = number
            } else {
                number = first + value
                setFirst(number)
            }
        }

        // Sets second number in equation and allows for multi-digit numbers
        if (operator) {
            if (second.includes('.') && value === '.') {
                number = number
            } else {
                number = second + value
                setSecond(number)
            }
        }
    }


    // useEffect(() => {
    //     console.log('second', second)
    // }, [second])

    // useEffect(() => {
    //     console.log('first', first)
    // }, [first])

    // useEffect(() => {
    //     console.log('result', result)
    // }, [result])



    const setOperation = (operator) => {
        // Prevents user from inputting operator without a first number
        if (!first) {
            setOperator("")
        } else {
            setOperator(operator)
        }
    }

    const calculate = () => {
        if (operator === '/') {
            const quotient = first/second
            setResult(quotient)
            //Takes result and moves to 'first' to allow process to continue with result as the starting number. Also resets second and operator to make clear display. 
            setFirst(quotient)
            setSecond("")
            setOperator("")
        }
        if (operator === '-') {
            let difference = (parseFloat(first) - parseFloat(second)) *100
            // The following ensures the correct number of decimal places are returned for floats. It compares the number of decimal places in each number, than uses the larger of those in toFixed(). 
            let decimalPlaces = ""
            if (first.includes('.') && second.includes('.')) {
                const firstSplit = first.split('.')
                let firstDecimals = firstSplit[1].length
                const secondSplit = second.split('.')
                let secondDecimals = secondSplit[1].length
                if (firstDecimals >= secondDecimals) {
                    decimalPlaces = firstDecimals
                } else {
                    decimalPlaces = secondDecimals
                }
            } else if (first.includes('.')) {
                let firstSplit = first.split('.')
                decimalPlaces = firstSplit[1].length
            } else if (second.includes('.')) {
                let secondSplit = second.split('.')
                decimalPlaces = secondSplit[1].length
            }
            difference = (difference/100).toFixed(decimalPlaces)
            setResult(difference)
            setFirst(difference)
            setSecond("")
            setOperator("")
            
        }
        if (operator === '*') {
            let product = (first * second) * 100
            product = product/100
            setResult(product)
            setFirst(product)
            setSecond("")
            setOperator("")
        }
        if (operator === '+') {
            let sum = (parseFloat(first) + parseFloat(second)) * 100 
            // The following ensures the correct number of decimal places are returned for floats. It compares the number of decimal places in each number, than uses the larger of those in toFixed(). 
            let decimalPlaces = ""
            if (first.includes('.') && second.includes('.')) {
                const firstSplit = first.split('.')
                let firstDecimals = firstSplit[1].length
                const secondSplit = second.split('.')
                let secondDecimals = secondSplit[1].length
                if (firstDecimals >= secondDecimals) {
                    decimalPlaces = firstDecimals
                } else {
                    decimalPlaces = secondDecimals
                }
            } else if (first.includes('.')) {
                let firstSplit = first.split('.')
                decimalPlaces = firstSplit[1].length
            } else if (second.includes('.')) {
                let secondSplit = second.split('.')
                decimalPlaces = secondSplit[1].length
            }
            sum = (sum/100).toFixed(decimalPlaces)
            setResult(sum)
            setFirst(sum)
            setSecond("")
            setOperator("")
        }
    }

    const clear = () => {
        setFirst("")
        setOperator("")
        setResult("")
        setSecond("")
    }

    // const delNum = () => {
    //     if (!operator)
    // }


    const equationDisplay = () => {
        if (second && operator === '/' || operator === '-' || operator === '+' || operator === '*') {
            return `${first} ${operator} ${second}`
        } else {
            return `${first || '-'} ${operator}`
        }

    }

    return (
        <>
        <div className="calculator__body">
            <div className="calculator__screen">
                <div className="calculator__screen__previous">
                   {equationDisplay()}
                </div>
                <div className="calculator__screen__first">
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
                <NumberButton value='7' setFirst={setFirst}/> 
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