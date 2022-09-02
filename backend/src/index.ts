import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors';
import { getId, getVideoData } from './helper';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors())

app.get('/api/videos', async (req, res) => {
    const videos = await prisma.video.findMany();
    res.json(videos);
})

app.post(`/api/video`, async (req, res) => {
    const { url } = req.body
    let video : any = {
        id: getId(url),
        imgSrc: '',
        title: '',
    }

    try{
        const data : any = await getVideoData(url)
        Object.assign(video,{ imgSrc: data.thumbnail_url, title: data.title})
    }catch(err){
        console.log(err)
    }

    const newVideo = await prisma.video.create({
        data: video
    })

    res.json(newVideo);
})

app.delete(`/api/video/:id`, async (req, res) => {
    const { id } = req.params
    const video = await prisma.video.delete({
        where: {
            id
        }
    })
    res.json(video)
})

const server = app.listen(3333, () => console.log(`🚀 Server ready at: http://localhost:3333`))
