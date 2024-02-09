const { ApolloClient, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
  uri: "https://leetcode.com/graphql",
  cache: new InMemoryCache(),
});

const getUserProfile = async (username) => {
  const { data } = await client.query({
    query: `
      query getUserProfile($username: String!) {
        user(username: $username) {
          username
          problemsSolved
          rating
        }
      }
    `,
    variables: {
      username: username,
    },
  });

  return data.user;
};

const getSubmissionHistory = async (username) => {
  const { data } = await client.query({
    query: `
      query getSubmissionHistory($username: String!) {
        user(username: $username) {
          submissionHistory {
            question {
              title
              slug
            }
            status
            submissionTime
          }
        }
      }
    `,
    variables: {
      username: username,
    },
  });

  return data.user.submissionHistory;
};

const getContestParticipationHistory = async (username) => {
  const { data } = await client.query({
    query: `
      query getContestParticipationHistory($username: String!) {
        user(username: $username) {
          contestParticipationHistory {
            contest {
              name
              startDate
              endDate
            }
            ranking
          }
        }
      }
    `,
    variables: {
      username: username,
    },
  });

  return data.user.contestParticipationHistory;
};

const userProfile = getUserProfile('username');
console.log(userProfile);

const submissionHistory = getSubmissionHistory('username');
console.log(submissionHistory);

const contestParticipationHistory = getContestParticipationHistory('username');
console.log(contestParticipationHistory);
