import React from "react";
import {useParams} from "react-router-dom";
import {Card, CardType} from "./card";

const CARDS: CardType[] = [
  {
    word: 'cry',
    translation: 'плакать',
    image: '/memes/1.jpg',
    audioSrc: 'audio/cry.mp3'
  },
  {
    word: 'dance',
    translation: 'танцевать',
    image: '/memes/2.jpg',
    audioSrc: 'audio/dance.mp3'
  },
  {
    word: 'dive',
    translation: 'нырять',
    image: '/memes/3.jpg',
    audioSrc: 'audio/dive.mp3'
  },
  {
    word: 'draw',
    translation: 'рисовать',
    image: '/memes/4.jpg',
    audioSrc: 'audio/draw.mp3'
  },
  {
    word: 'fish',
    translation: 'ловить рыбу',
    image: '/memes/5.jpg',
    audioSrc: 'audio/fish.mp3'
  },
  {
    word: 'fly',
    translation: 'летать',
    image: '/memes/6.jpg',
    audioSrc: 'audio/fly.mp3'
  },
  {
    word: 'hug',
    translation: 'обнимать',
    image: '/memes/7.jpg',
    audioSrc: 'audio/hug.mp3'
  },
  {
    word: 'jump',
    translation: 'прыгать',
    image: '/memes/8.jpg',
    audioSrc: 'audio/jump.mp3'
  }
]

export function Cards({play}: { play: boolean }) {
  const {category} = useParams<{ category: string }>();
  console.log(category)

  return (
    <div className="container">
      {CARDS.map((card, index) => <Card {...card} key={index} play={play} />)}
    </div>
  )
}
