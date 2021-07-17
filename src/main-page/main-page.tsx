import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CardType} from "../cards/card";

type Category = {
  type: string,
  name: string,
  imgSrc: string,
  items: CardType[]
}

export function MainPage() {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/api/categories')
      const data = await res.json()

      setCategories(data)
    }

    loadData()
  }, [])

  return (
    <div className="theme-container">
      {categories.map((cat) => (
        <Link to={cat.type} className="theme-card" key={cat.type}>
          <img src={cat.imgSrc} alt="img" />
          {cat.name}
        </Link>
      ))}
    </div>
  )
}
