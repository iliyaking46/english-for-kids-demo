import React from "react";
import {Link} from "react-router-dom";
import data from "../data.json"
import {CardType} from "../cards/card";

type Category = {
  type: string,
  name: string,
  imgSrc: string,
  items: CardType[]
}

const CATEGORIES = (data as Category[]).map(({type, name, imgSrc}) => ({type, name, imgSrc}))

export function MainPage() {
  return (
    <div className="theme-container">
      {CATEGORIES.map((cat) => (
        <Link to={cat.type} className="theme-card" key={cat.type}>
          <img src={cat.imgSrc} alt="img" />
          {cat.name}
        </Link>
      ))}
    </div>
  )
}
