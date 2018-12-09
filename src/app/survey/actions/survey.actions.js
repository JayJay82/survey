
export const GET_SURVEY = "GET_SURVEY";
export function getSurvey() {
    return {
        type : GET_SURVEY,
        payload : { title : "Costantino"}
    }
}