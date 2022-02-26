const BASE_URL = "/";

function request(url, options = { method: "GET" }) {
  return fetch(`${BASE_URL}${url}`, options).then((response) => {
    return new Promise((resolve) => {
      if (options["Content-Type"] === "text/csv") {
        resolve(response.text());
      } else {
        resolve(response.json());
      }
    });
  });
}

const postUserResponse = (questionId, userAnswer, trueAnswer, user) => {
  return request(`api/experiments/${questionId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userAnswer, trueAnswer, user }),
  });
};
