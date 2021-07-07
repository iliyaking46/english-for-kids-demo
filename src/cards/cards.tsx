import React from "react";
import {useParams} from "react-router-dom";
import {Card, CardType} from "./card";

import img1 from './memes/1.jpg'
import img2 from './memes/2.jpg'
import img3 from './memes/3.jpg'
import img4 from './memes/4.jpg'
import img5 from './memes/5.jpg'
import img6 from './memes/6.jpg'
import img7 from './memes/7.jpg'
import img8 from './memes/8.jpg'

const CARDS: CardType[] = [
    {
        word: 'cry',
        translation: 'плакать',
        image: img1,
        audioSrc: 'audio/cry.mp3'
    },
    {
        word: 'dance',
        translation: 'танцевать',
        image: img2,
        audioSrc: 'audio/dance.mp3'
    },
    {
        word: 'dive',
        translation: 'нырять',
        image: img3,
        audioSrc: 'audio/dive.mp3'
    },
    {
        word: 'draw',
        translation: 'рисовать',
        image: img4,
        audioSrc: 'audio/draw.mp3'
    },
    {
        word: 'fish',
        translation: 'ловить рыбу',
        image: img5,
        audioSrc: 'audio/fish.mp3'
    },
    {
        word: 'fly',
        translation: 'летать',
        image: img6,
        audioSrc: 'audio/fly.mp3'
    },
    {
        word: 'hug',
        translation: 'обнимать',
        image: img7,
        audioSrc: 'audio/hug.mp3'
    },
    {
        word: 'jump',
        translation: 'прыгать',
        image: img8,
        audioSrc: 'audio/jump.mp3'
    }
]

export function Cards() {
    const {category} = useParams<{category: string}>();
    console.log(category)
    return (
        <div className="container">
            {CARDS.map((card, index) => <Card {...card} key={index} />)}
        </div>
    )
}
