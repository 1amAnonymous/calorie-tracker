import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBwSZnlpZnHmgmpZhqLNWR5mqbetnUEcdI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getResp(gender, height, age, currentWeight,targetWeight){
    const prompt = `Create a JSON object representing a weekly diet and exercise plan for a ${gender} of ${age} years old with a height of ${height}cm. the goal is to ${targetWeight-currentWeight>0?"gain":"lose"} weight from ${currentWeight} to ${targetWeight} kg current height is 5ft 10inch. The diet should be an array of objects. Each object in the diet array should have a day (string) and meals (object) property. The meals object should have breakfast, lunch, dinner, and snacks properties, each containing a string describing the meal and estimated calories in parentheses. The exercise object should have cardio and strength_training properties, each being an array of objects. Each object in these arrays should have a name (string) and time (string) property. Provide realistic examples of meals and exercises. do not add any extra fields.add a calori_target field also.`;
    console.log(prompt)
    const result = await model.generateContent(prompt);
    const resp = result.response.text();
    const first = resp.indexOf('{');
    const last = resp.lastIndexOf('}');
    const json = resp.substring(first, last + 1);
    console.log(json);
    const obj = JSON.parse(json);
    return obj;

}