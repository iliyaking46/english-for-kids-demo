import React from "react";
import {useParams} from "react-router-dom";
import {Card} from "./card";
import data from "../data.json"

export function Cards({play}: { play: boolean }) {
  const {type} = useParams<{ type: string }>();
  const {items = []} = data.find(cat => cat.type === type) || {}

  return (
    <div className="container">
      {items.map((card) => <Card {...card} key={card.word} play={play} />)}
    </div>
  )
}
