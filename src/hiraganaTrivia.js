import React, { useState, useRef } from 'react'
import HiraganaCard from './hiraganaCard'
import { addToList, getKey, setSourceArray } from './randomCharacterPicker'
import './hiraganaTrivia.css'

export default function HiraganaTrivia() {
    const refHiraganaRadio = useRef();
    const initAlphabet = useRef(false);

    const [newKey, newValue] = getKey()
    const [key, setKey] = useState(newKey)
    const [value, setValue] = useState(newValue)
    const [isChecked, setIsChecked] = useState(true)

    if (!initAlphabet.current) {
        setSourceArray(true)
        getNewValues()
        initAlphabet.current = true;
    }

    function clickedButton(e) {
        const clazz = e.target.className
        let type = clazz === "buttonHard" ? 1 : clazz === "buttonMedium" ? 2 : 3

        addToList(type, key)
        getNewValues()
    }

    function getNewValues() {
        const [newKey, newValue] = getKey()

        setKey(newKey)
        setValue(newValue)

        if (newKey === '?') {
            alert('You memorized all the characters, congrats!!!')
            resetAlphabet()
        }
    }

    function switchAlphabet() {
        setIsChecked(!isChecked)
        resetAlphabet()
    }

    function resetAlphabet() {
        setSourceArray(refHiraganaRadio.current.checked)
        getNewValues()
    }

    return (
        <div className="container">
            <div className="instructions">
                Place the mouse(your finger) over the black text
                <p>Select an option on the right for a new character</p>
            </div>
            <div className="containerHiraganaTrivia">
                <div className="hiraganaCardContainer">
                    <HiraganaCard mykey={key} myvalue={value} />
                </div>
                <div className="containerRight">
                    <button className="buttonHard" onClick={clickedButton}>hard to remember</button>
                    <button className="buttonMedium" onClick={clickedButton}>repeat later</button>
                    <button className="buttonEasy" onClick={clickedButton}>easy</button>
                </div>
            </div>
            <div className="instructionsFooter">
                <input type="radio" name="demo" value="false" id="RtH" checked={isChecked} onChange={switchAlphabet} ref={refHiraganaRadio} />
                <label>Romaji to hiragana</label>
                <input type="radio" name="demo" value="true" id="HtR" checked={!isChecked} onChange={switchAlphabet} />
                <label>Hiragana to Romaji</label>
            </div>
            <div className="linksToOtherApps">
                <a href="http://japanese-hiragana-trivia.herokuapp.com/">Click to study Hiragana...</a>
                <p />
                <a href="http://japanese-numbers-trivia.herokuapp.com/">Click to study Japanese Numbers...</a>
            </div>
        </div>
    )
}