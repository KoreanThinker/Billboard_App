export type Timestamp = number

export type Hot100Item = {
    title: string,
    singer: string,
    image: string,
    rank: number,
}


export { getHot100, updateHot100 } from './hot100'