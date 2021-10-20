import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase)
const db = admin.firestore();


 export const getModule = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello");

 });

  export const getModules = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello");
 }); 
 

 
 export const getCourses =  functions.https.onRequest( async (request, response) => {

    try{
        const courses = await db.collection('courses').get();  
        const finalResponse = courses.docs.map((eachDoc) => {
            return eachDoc.data()
        })
        console.log('courses', courses)
        response.send(finalResponse)
    }catch(e){
        console.log('error', e)
    }


 }); 
 
 export const getCourse = functions.https.onRequest( async  (request, response) => {

    const courseId = request.body.courseId;
    console.log('courseId', courseId);
    
    
    try{
        const course = await db.collection('courses').doc(courseId.toString()).get()
        const data = course.data()
        console.log(data);
        
        response.send(data);
    }catch(e){
        console.log(e);
        
    }
    
 });
 
 
 export const getTopics = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello");
 }); 


 /// PLAYGROUND DE FUNCIONES 

 
 
 

