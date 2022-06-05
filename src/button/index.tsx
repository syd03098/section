import React from "react";

const Button = () => {
    return <button type="button" onClick={() => {
        console.debug('clicked')
    }}>hello</button>
}

export default Button;