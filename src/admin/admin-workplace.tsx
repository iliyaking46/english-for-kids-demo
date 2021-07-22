import React, {ChangeEvent, useEffect, useState} from "react";
import {Category} from "../main-page/main-page";

export const AdminWorkplace = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [type, setType] = useState('action-a')
  const [word, setWord] = useState('pain')
  const [translation, setTranslation] = useState('боль')
  const [image, setImage] = useState<File>()
  const [sound, setSound] = useState<File>()

  const handleSubmit = async () => {
    const data = new FormData()
    data.append("word", word)
    data.append("translation", translation)
    data.append("image", image!)
    data.append("sound", sound!)

    const res = await fetch(`/api/categories/${type}`, {
      method: 'post',
      body: data
    })

    const json = await res.json()
    console.log(json)
  }

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    }

    loadData()
  }, [])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleSoundChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSound(e.target.files[0])
    }
  }

  return (
    <div style={{display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: "center"}}>
      <div>
        <select
          value={type}
          name="category"
          id="category"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
        >
          {categories.map(cat => <option key={cat.type} value={cat.type}>{cat.name}</option>)}
        </select>
      </div>
      <div>
        <input
          placeholder="Слово на английском"
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)} />
      </div>
      <div>
        <input
          placeholder="Слово на русском"
          type="text"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)} />
      </div>
      <div>
        image
        <input type="file" multiple={false} onChange={handleImageChange} />
      </div>
      <div>
        sound
        <input type="file" multiple={false} onChange={handleSoundChange} />
      </div>
      <div style={{marginTop: 20}}>
        <button onClick={handleSubmit} type="button">Submit</button>
      </div>
    </div>
  )
}
