import { BallTriangle } from 'react-loader-spinner'
import "../styles/Spinner.css"

export function Spinner() {
    return (
        <div className='spinner'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#FF3131"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>);
}

