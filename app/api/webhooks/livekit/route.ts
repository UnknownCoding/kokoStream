import { db } from '@/lib/db';
import { WebhookReceiver } from 'livekit-server-sdk';
import { headers } from 'next/headers';

const receiver = new WebhookReceiver(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!);


export const POST = async (req:Request) => {
    const body = await req.text()
    const authHeader = headers().get('Authorization')
    // listen to where he says some important about this somewhere
    if(!authHeader){
        return new Response("no authorization header",{status:400})
    }
    const event = receiver.receive(body,authHeader)
    if(event.event === "ingress_started"){
        await db.stream.update({
            where:{
                ingressId:event.ingressInfo?.ingressId,
            },
            data:{
                isLive:true
            }
        })
    }else if(event.event === "ingress_ended"){
        await db.stream.update({
            where:{
                ingressId:event.ingressInfo?.ingressId,
            },
            data:{
                isLive:false
            }
        })
    }
}
