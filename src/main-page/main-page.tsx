import React from "react";
import {Link} from "react-router-dom";

type Card = {
  name: string,
  img: string,
  category: string
}

const CARDS: Card[] = [
  {
    name: 'Action A',
    img: '/pepes/1.jpg',
    category: 'memes'
  },
  {
    name: 'Action B',
    img: '/pepes/2.jpg',
    category: 'memes'
  },
  {
    name: 'Action C',
    img: '/pepes/3.jpg',
    category: 'memes'
  },
  {
    name: 'Adjective',
    img: '/pepes/4.jpg',
    category: 'memes'
  },
  {
    name: 'Animal',
    img: '/pepes/5.jpg',
    category: 'memes'
  },
  {
    name: 'Animal 2',
    img: '/pepes/6.jpg',
    category: 'memes'
  },
  {
    name: 'Animal 3',
    img: '/pepes/7.jpg',
    category: 'memes'
  },
  {
    name: 'Animal 4',
    img: '/pepes/8.jpg',
    category: 'memes'
  },
]

export function MainPage() {
  return (
    <div className="theme-container">
      {CARDS.map((card, index) => (
        <Link to={card.category} className="theme-card" key={index}>
          <img src={card.img} alt="img" />
          {card.name}
        </Link>
      ))}
    </div>
  )
}
