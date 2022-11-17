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
    let decimalPlaces = ""

    const setNumber = (value) => {
        // Sets first number in equation, prevents multiple decimal points and allows for multi-digit numbers
        if (!operator) {
            if (first.includes('.') && value === '.') {
                number = number
            } else {
                number = first + value
                setFirst(number)
            }
        }

        // Sets second number in equation, prevents multiple decimal points and allows for multi-digit numbers
        if (operator) {
            if (second.includes('.') && value === '.') {
                number = number
            } else {
                number = second + value
                setSecond(number)
            }
        }
    }

    const setOperation = (operator) => {
        // Prevents user from inputting operator without a first number
        if (!first) {
            setOperator("")
        } else {
            setOperator(operator)
        }
    }
    
    // Ensures the correct number of decimal places are returned for floats. It compares the number of decimal places in each number, than uses the larger of those in toFixed(). 
    const decimalFormat = () => {
        // Changes to string to use .includes()
        let firstString = first.toString()
        let secondString = second.toString()
        if (operator === '*' && firstString.includes('.') && secondString.includes('.')) {
            const firstSplit = firstString.split('.')
            let firstDecimals = firstSplit[1].length
            const secondSplit = secondString.split('.')
            let secondDecimals = secondSplit[1].length
            decimalPlaces = firstDecimals + secondDecimals
        } else if (operator === '*' && firstString.includes('.') && !secondString.includes('.')) {
            const firstSplit = firstString.split('.')
            decimalPlaces = firstSplit[1].length
        } else if (operator === '*' && !firstString.includes('.') && secondString.includes('.')) {
            const firstSplit = firstString.split('.')
            decimalPlaces = firstSplit[1].length
        } else if (firstString.includes('.') && secondString.includes('.')) {
            const firstSplit = firstString.split('.')
            let firstDecimals = firstSplit[1].length
            const secondSplit = secondString.split('.')
            let secondDecimals = secondSplit[1].length
            if (firstDecimals >= secondDecimals) {
                decimalPlaces = firstDecimals
            } else {
                decimalPlaces = secondDecimals
            }
        } else if (firstString.includes('.')) {
            let firstSplit = firstString.split('.')
            decimalPlaces = firstSplit[1].length
        } else if (secondString.includes('.')) {
            let secondSplit = secondString.split('.')
            decimalPlaces = secondSplit[1].length
        } 
    }


    // use 9.9 / 3.3 as test case
    const calculate = () => {
        if (operator === '/') {
            const quotient = first/second
            setResult(quotient)
            setFirst(quotient)
            setSecond("")
            setOperator("")
        }
        if (operator === '-') {
            let difference = (parseFloat(first) - parseFloat(second)) *100
            // The following ensures the correct number of decimal places are returned for floats. It compares the number of decimal places in each number, than uses the larger of those in toFixed(). 
            decimalFormat()
            // let decimalPlaces = ""
            // if (first.includes('.') && second.includes('.')) {
            //     const firstSplit = first.split('.')
            //     let firstDecimals = firstSplit[1].length
            //     const secondSplit = second.split('.')
            //     let secondDecimals = secondSplit[1].length
            //     if (firstDecimals >= secondDecimals) {
            //         decimalPlaces = firstDecimals
            //     } else {
            //         decimalPlaces = secondDecimals
            //     }
            // } else if (first.includes('.')) {
            //     let firstSplit = first.split('.')
            //     decimalPlaces = firstSplit[1].length
            // } else if (second.includes('.')) {
            //     let secondSplit = second.split('.')
            //     decimalPlaces = secondSplit[1].length
            // }
            difference = (difference/100).toFixed(decimalPlaces)
            setResult(difference)
            setFirst(difference)
            setSecond("")
            setOperator("")
            
        }
        if (operator === '*') {
            let product = first * second  
            decimalFormat()
            product = product.toFixed(decimalPlaces)
            setResult(product)
            setFirst(product)
            setSecond("")
            setOperator("")
        }
        if (operator === '+') {
            let sum = parseFloat(first) + parseFloat(second)  
            // The following ensures the correct number of decimal places are returned for floats. It compares the number of decimal places in each number, than uses the larger of those in toFixed(). 
            decimalFormat()
            // let decimalPlaces = ""
            // // Changes to string to use .includes()
            // let firstString = first.toString()
            // let secondString = second.toString()
            // if (firstString.includes('.') && secondString.includes('.')) {
            //     const firstSplit = firstString.split('.')
            //     let firstDecimals = firstSplit[1].length
            //     const secondSplit = secondString.split('.')
            //     let secondDecimals = secondSplit[1].length
            //     if (firstDecimals >= secondDecimals) {
            //         decimalPlaces = firstDecimals
            //     } else {
            //         decimalPlaces = secondDecimals
            //     }
            // } else if (firstString.includes('.')) {
            //     let firstSplit = firstString.split('.')
            //     decimalPlaces = firstSplit[1].length
            // } else if (secondString.includes('.')) {
            //     let secondSplit = secondString.split('.')
            //     decimalPlaces = secondSplit[1].length
            // }
            sum = sum.toFixed(decimalPlaces)
            setResult(sum)
            setFirst(sum)
            setSecond("")
            setOperator("")
        } else if (operator === '**') {
            const answer = Math.pow(first, second)
            setResult(answer)
            setFirst(answer)
            setSecond("")
            setOperator("")
        } else if (operator === '^2') {
            const answer = Math.pow(first, 2)
            setResult(answer)
            setFirst(answer)
            setSecond("")
            setOperator("")
        } else if (operator === '√') {
            const answer = Math.sqrt(first)
            setResult(answer)
            setFirst(answer)
            setSecond("")
            setOperator("")
        }
    }

    // Resets all values/operator and clears display
    const clear = () => {
        setFirst("")
        setOperator("")
        setResult("")
        setSecond("")
    }

    // Deletes the most recently entered digit
    const deleteNumber = () => {
        if (!operator) {
            const newFirst = first.slice(0, first.length-1)
            setFirst(newFirst)
        } else {
            const newSecond = second.slice(0, second.length-1)
            setSecond(newSecond)
        }
    }

    // Toggles input between positive and negative
    const negative = () => {
        if (second) {
            const negSecond = second * -1
            setSecond(negSecond)
        } else if (first) {
           const negFirst = first * -1
           setFirst(negFirst)
        }
    }

    const equationDisplay = () => {
        if (second && operator === '/' || operator === '-' || operator === '+' || operator === '*' || operator === '**') {
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
                <button onClick={() => clear()} id="ac">Clear</button>
                <button onClick={() => deleteNumber()} id="del">Del</button>
                <button onClick={() => setOperation('/')} className="calculator__operator">÷</button>
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

                <button onClick={() => negative()} className="calculator__operator" id="negative">+-</button>
                <button onClick={() => setOperation('^2')} className="calculator__operator" id="square">x<sup>2</sup></button>
                <button onClick={() => setOperation('**')} className="calculator__operator" id="exponent">x<sup>y</sup></button>
                <button onClick={() => setOperation('√')} className="calculator__operator" id="radical">√</button>
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