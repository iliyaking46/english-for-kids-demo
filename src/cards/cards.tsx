import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Card, CardType} from "./card";

export function Cards({play}: { play: boolean }) {
  const {type} = useParams<{ type: string }>();
  const [items, setItems] = useState<CardType[]>([])

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`/api/categories/${type}`)
      const data = await res.json()

      setItems(data)
    }

    loadData()
  }, [type])

  if (items.length === 0 ) return <div>'no items'</div>

  return (
    <div className="container">
      {items.map((card) => <Card {...card} key={card.word} play={play} />)}
    </div>
  )
}
