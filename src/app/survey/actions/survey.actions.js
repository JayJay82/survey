
export const GET_SURVEY = "GET_SURVEY";
export function getSurvey() {
    console.log("action");
    return {
        type : GET_SURVEY,
        payload : { title : "Costantino"}
    }
}