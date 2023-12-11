import { useState } from "react"

export function Error({err, className}) {
    const [error, setError] = useState("");

    setError(err);
    return (
        <div className={className}>
            {error};
        </div>
    )
}

    