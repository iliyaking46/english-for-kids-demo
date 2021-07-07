import React from "react";
import {
    Link
} from "react-router-dom";
import img1 from './pepes/2.jpg'
import img2 from './pepes/3.jpg'
import img3 from './pepes/4.jpg'
import img4 from './pepes/5.jpg'
import img5 from './pepes/7.jpg'
import img6 from './pepes/8.jpg'
import img7 from './pepes/9.jpg'
import img8 from './pepes/10.jpg'

type Card = {
    name: string,
    img: string,
    category: string
}

const CARDS: Card[] = [
    {
        name: 'Action A',
        img: img1,
        category: 'memes'
    },
    {
        name: 'Action B',
        img: img2,
        category: 'memes'
    },
    {
        name: 'Action C',
        img: img3,
        category: 'memes'
    },
    {
        name: 'Adjective',
        img: img4,
        category: 'memes'
    },
    {
        name: 'Animal',
        img: img5,
        category: 'memes'
    },
    {
        name: 'Animal 2',
        img: img6,
        category: 'memes'
    },
    {
        name: 'Animal 3',
        img: img7,
        category: 'memes'
    },
    {
        name: 'Animal 4',
        img: img8,
        category: 'memes'
    },
]

export function MainPage() {
    return (
        <div className="container">
            {CARDS.map((card, index) => (
                <Link to={card.category} className="theme-card" key={index}>
                    <img src={card.img} alt="img"/>
                    {card.name}
                </Link>
            ))}
        </div>
    )
}
