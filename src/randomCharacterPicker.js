import { hiragana } from './hiragana'
import { romaji } from './romaji'

const HARD = 1
const MEDIUM = 2

let hard = []
let medium = []

let hiraganaCopy = []
let romajiCopy = []

let source = []

export const setSourceArray = (isHiragana) => {
    resetArrays()
    source = isHiragana ? hiraganaCopy : romajiCopy
}

export const getKey = () => {
    let key
    if (Object.keys(hard).length > 0 && shouldIPlayThis(HARD)) {
        key = loadkey(hard)
    } else if (Object.keys(medium).length > 0 && shouldIPlayThis(MEDIUM)) {
        key = loadkey(medium)
    } else if (Object.keys(source).length > 0) {
        key = loadkey(source)
    } else {
        if (Object.keys(hard).length > 0) {
            key = loadkey(hard)
        } else if (Object.keys(medium).length > 0) {
            key = loadkey(medium)
        } else {
            key = '?'
        }
    }
    return [key, getValue(key)]
}

export const addToList = (type, key) => {
    const value = source[key] != null ? source[key] : hard[key] != null ? hard[key] : medium[key] != null ? medium[key] : null
    switch (type) {
        case HARD:
            hard[key] = value
            break
        case MEDIUM:
            medium[key] = value
            break
        default:
            break
    }
    delete deleteFromArray(key)
}

const getValue = (key) => {
    return source[key] != null ? source[key] : hard[key] != null ? hard[key] : medium[key] != null ? medium[key] : '?'
}

const deleteFromArray = (key) => {
    if (source[key] != null) {
        delete source[key]
    } else if (hard[key] != null) {
        delete hard[key]
    } else {
        delete medium[key]
    }
}

const shouldIPlayThis = (type) => {
    return Math.random() > (type === HARD ? 0.65 : 0.75)
}

const loadkey = (array) => {
    return Object.keys(array)[Math.floor(Math.random() * Object.keys(array).length)]
}

const resetArrays = () => {
    hiraganaCopy = []
    romajiCopy = []

    hard = []
    medium = []

    for (let i = 0; i < Object.keys(hiragana).length; i++) {
        hiraganaCopy[Object.keys(hiragana)[i]] = hiragana[Object.keys(hiragana)[i]]
    }

    for (let i = 0; i < Object.keys(romaji).length; i++) {
        romajiCopy[Object.keys(romaji)[i]] = romaji[Object.keys(romaji)[i]]
    }
}