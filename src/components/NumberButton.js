export const NumberButton = ({ value, setCurrent }) => {
    return <button 
                className="calculator__button"
                onClick={() => console.log(value)}>
                {value} 
            </button>
}