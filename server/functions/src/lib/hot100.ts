import { QuerySnapshot, DocumentSnapshot } from '@google-cloud/firestore'
import { hot100Collection, youtubeDataCollection, dataCollection, dataHot100dataType } from './firebase'
import { Hot100Item } from '..'
import { dateNowGenerator } from './generator/dateGenerator'
import idGenerator from './generator/idGenerator'


const getRecentHot100Docsid = async (): Promise<string> => {
    const snapshot = await dataCollection('hot100Data').get()
    const data = snapshot.data() as dataHot100dataType
    return data.recentDocsId
}

export const getRecentHot100OrderByRank = async (afterRank: number = 0): Promise<QuerySnapshot> => {

    const id = await getRecentHot100Docsid()

    return await hot100Collection(id)
        .where('rank', '>', afterRank)
        .orderBy('rank', 'asc')
        .limit(20)
        .get()
}


export const getYoutubeData = async (id: string): Promise<DocumentSnapshot> => {
    return await youtubeDataCollection
        .doc(id)
        .get()
}

export const setYoutubeData = async (id: string, data: any) => {
    await youtubeDataCollection.doc(id).set(data)
    return
}

export const updateHot100Docs = async (newHot100: Hot100Item[]) => {

    const id = idGenerator()
    const data: dataHot100dataType = {
        recentDocsDate: dateNowGenerator(),
        recentDocsId: id
    }

    await dataCollection('hot100Data').set(data)
    await dataCollection('hot100Data').collection('old').doc(id).set(data)


    for (const i in newHot100) {
        await hot100Collection(id).add(newHot100[i])
    }

    return
}

