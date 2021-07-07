import React from "react";

export type CardType = {
    word: string,
    translation: string,
    image: string,
    audioSrc: string
}

export function Card({word, translation, image}: CardType) {
    return (
        <div className="card-container">
            <div className="card">
                <div className="front" style={{backgroundImage: `url(${image})`}}>
                    <div className="card-header">{word}</div>
                </div>
                <div className="back" style={{backgroundImage: `url(${image})`}}>
                    <div className="card-header">{translation}</div>
                </div>
                <div className="rotate" />
            </div>
        </div>
    )
}
