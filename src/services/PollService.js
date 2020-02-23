export const QUESTIONS_URL_KEY = "questions_url";

export class PollService {
  static questionsUrl = null;
  static pollApiRoot = null;

  static init = async pollApiRoot => {
    this.pollApiRoot = pollApiRoot;
    const response = await fetch(pollApiRoot);
    const responseJSON = await response.json();
    this.questionsUrl = `${pollApiRoot}${responseJSON[QUESTIONS_URL_KEY]}`;
  };

  static fetchPollQuestions = async () => {
    const response = await fetch(this.questionsUrl);
    const responseJSON = await response.json();
    return responseJSON;
  };

  static postSelectedPollChoice = async pollChoice => {
    const { url } = pollChoice;
    const response = await fetch(`${this.pollApiRoot}${url}`, {
      method: "POST"
    });
    const responseJSON = await response.json();
    return responseJSON;
  };

  static createPoll = async ({ question, choices }) => {
    const response = await fetch(this.questionsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question, choices })
    });

    if (response.ok) {
      console.log("Poll created");
    }
  };
}
