import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { resetIngress } from '@/actions/ingress'

export async function POST(req:Request){

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");  

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {status: 400})
    }
    
    const payload = await req.json()
    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {status: 400})
    }
        
        const eventType = evt.type;
        if(eventType === "user.created"){
            await db.users.create({
                data:{  
                    externalUserId:payload.data.id,
                    username:payload.data.username,
                    imageUrl:payload.data.image_url,
                    streams:{
                        create:{
                            name:`${payload.data.username}'s stream`
                        }
                    }
                }
            })
        }else if(eventType === "user.updated"){
            await db.users.update({
                where:{
                    externalUserId:payload.data.id
                },
                data:{
                    username:payload.data.username,
                    imageUrl:payload.data.image_url,
                }
            })
        }else if(eventType === "user.deleted"){
            const currUser = await db.users.findUnique({
                where:{
                    externalUserId:payload.data.id
                }
            })
            if(!currUser){
                return new Response('User doesnt exist in our database',{status:404})
            }
            await resetIngress(payload.data.id)
            await db.users.delete({
                where:{
                    externalUserId:payload.data.id
                }
            })
        }
                
        return new Response('', { status: 200 })
    
}