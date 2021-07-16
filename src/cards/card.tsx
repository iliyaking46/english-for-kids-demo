import React, {SyntheticEvent, useState} from "react";

export type CardType = {
  word: string,
  translation: string,
  image: string,
  soundSrc: string
}

type Props = CardType & {
  play: boolean
}

export function Card({word, translation, image, soundSrc, play}: Props) {
  const [translate, setTranslate] = useState(false);

  function playSound() {
    if (play) {
      const audio = new Audio('assets/sounds/system-sounds/correct.mp3')
      audio.play()
    } else {
      const audio = new Audio(soundSrc)
      audio.play()
    }
  }

  function handleRotateCard(event: SyntheticEvent<HTMLDivElement>) {
    event.stopPropagation()
    setTranslate(true)
  }

  return (
    <div className="card-container">
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
        {play ? null : <div className="rotate" onClick={handleRotateCard} />}
      </div>
    </div>
  )
}
