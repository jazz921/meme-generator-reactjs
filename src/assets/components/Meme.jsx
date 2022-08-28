import React, { useEffect, useState } from 'react'

export default function Meme() {
    const [memeData, setMemeData] = useState()
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        memeImage: "http://i.imgflip.com/1bij.jpg"
    })

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemeData(data.data.memes))
    }, [])


    function getMemeImage() {
        let randomNum = Math.floor(Math.random() * memeData.length)
        let img =  memeData[randomNum].url
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                memeImage: img
            } 
        })
    }

    function handleText(event) {
        const {name, value} = event.target
        setMeme(prevText => {
            return {
                ...prevText,
                [name]: value
            }
        }) 
    }

    return (
        <div className="meme">
            <div className="input-container">
                <input 
                    type="text" 
                    name="topText" 
                    onChange={handleText} 
                    placeholder="Top Text"
                    value={meme.topText}
                />
                <input 
                    type="text" 
                    name="bottomText" 
                    onChange={handleText} 
                    placeholder="Bottom Text"
                    value={meme.bottomText}    
                />
            </div>
            <button onClick={getMemeImage}>Get new meme image</button>
            <div className="img-container">
                <img src={meme.memeImage} alt="" />
                <h1 className="meme-text toptext">{meme.topText}</h1>
                <h1 className="meme-text bottomtext">{meme.bottomText}</h1>
            </div>

        </div>
    )
}
