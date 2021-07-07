import React, {useState} from "react";
import correct from "./correct.mp3"

export type CardType = {
    word: string,
    translation: string,
    image: string,
    audioSrc: string
}

export function Card({word, translation, image}: CardType) {
    const [translate, setTranslate] = useState(false);

    function playSound() {
        const audio = new Audio(correct)
        audio.play()
    }

    return (
        <div className="card-container" >
            <div className={`card${translate ? ' translate' : ''}`}
                 onMouseLeave={() => setTranslate(false)}
                 onClick={playSound}
            >
                <div className="front" style={{backgroundImage: `url(${image})`}}>
                    <div className="card-header">{word}</div>
                </div>
                <div className="back" style={{backgroundImage: `url(${image})`}}>
                    <div className="card-header">{translation}</div>
                </div>
                <div className="rotate" onClick={() => setTranslate(true)} />
            </div>
        </div>
    )
}
