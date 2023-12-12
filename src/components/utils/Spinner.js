import { BallTriangle } from 'react-loader-spinner'
import "../../styles/utils_css/Spinner.css"

export function Spinner() {
    return (
        <div className='spinner'>
            <BallTriangle
                height={60}
                width={60}
                radius={5}
                color="#FF3131"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>);
}

