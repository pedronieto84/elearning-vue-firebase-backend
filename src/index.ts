import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase)
const db = admin.firestore();
const cors = require('cors')({origin: true});


const getCollectionData = async (whatCollection:string, filterName?:any, filterField?:any) => {
      let  modulesArray; 
            if(filterName){
                 modulesArray = await db.collection(whatCollection).where(filterName, '==', parseInt(filterField)).get()
                 
                }else{
                 modulesArray = await db.collection(whatCollection).get()
                }
            const final =  modulesArray.docs.map((x)=>{
                return x.data()
            })
            return final;
}

    const getQueryData = (request: functions.https.Request) => {
                const keyName = Object.keys(request.query).length > 0 ? Object.keys(request.query)[0] : false
                const filterToQuery = request.query.courseId;
                return { keyName , filterToQuery }
    }

 export const getModule = functions.https.onRequest(async  (request, response) => {
        response.set('Access-Control-Allow-Origin', '*');

        //const moduleId = request.params
        console.log('params', request.params['0'])
        console.log('path', request.path)
        const moduleId = request.params['0'];
        /*
        let module = {
            moduleId: moduleId,
            topics: [],
            title: '',
            description: '',
            imageUrl: '',
            route: '',
            courseId: 1
        } */

        const doc = await db.collection('modules').where('moduleId', '==', parseInt(moduleId) ).get();
        const document = doc.docs[0].data();
        

        response.send(document)
      //  const data = await getCollectionData(request,  'modules', 'moduleId')
      //  response.send(data);
 });

  export const getModules = functions.https.onRequest(async (request, response) => {
       response.set('Access-Control-Allow-Origin', '*');
        cors(request, response, async ()=>{
            let  modulesArray; 
            if(request.query.courseId){
                const courseId = parseInt(request.query.courseId as string)
                 modulesArray = await db.collection('modules').where('courseId', '==', courseId).get()
            }else{
                 modulesArray = await db.collection('modules').get()
            }
            const cleanedData = modulesArray.docs.map((x)=>{
                return x.data()
            })
           return response.status(200).send(cleanedData) 
 });
 })

 export const getCourses =  functions.https.onRequest( async (request, response) => {
       response.set('Access-Control-Allow-Origin', '*');
        cors(request, response, async ()=>{
            let cleanedData = await getCollectionData('courses', getQueryData(request).keyName , getQueryData(request).filterToQuery)
            
            return response.status(200).send(cleanedData) 
        });
 });  
 
 export const getCourse = functions.https.onRequest( async  (request, response) => {
        response.set('Access-Control-Allow-Origin', '*');
     //   const data = await getCollectionData(request,  'courses', 'courseId')
     //   response.send(data);
 });
 
 export const getTopics = functions.https.onRequest(async (request, response) => {
       response.set('Access-Control-Allow-Origin', '*');
    //   const data = await getCollectionData(request, 'topics')
    //   response.send(data);
 }); 


 /// PLAYGROUND DE FUNCIONES 

 
 
 

