module.exports = {
  server: {
    ip: "0.0.0.0",
    hostname: "localhost",
    port: "6969"
  },
  errors: {
    malformedJson: {
      status: 500,
      code: 1,
      info: "Remote server has sent malformed data. I dont understand.."
    },
    connectionFailed: {
      status: 504,
      code: 2,
      info: "Remote server has timed out."
    },
    groupDoesntExist: {
      status: 404,
      code: 11,
      info: "This group does not exist."
    }
  }
}
