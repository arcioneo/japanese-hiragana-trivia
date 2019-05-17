import React, { } from 'react'
import './flip-card.css'

export default function HiraganaCard(props) {

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div className="para_div">
                        <p className="real">{props.mykey}</p>
                        <p className="refl">{props.mykey}</p>
                    </div>
                </div>
                <div className="flip-card-back">
                    <div className="para_div">
                        <p className="real">{props.myvalue}</p>
                        <p className="refl">{props.myvalue}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}