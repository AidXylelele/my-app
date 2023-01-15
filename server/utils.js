'use strict';

const parseRequest = (stringRequest) => {
  const data = stringRequest.toString().split(',');
  if (data.length === 3)
    return { message: data[0], sender: data[1], reciever: data[2] };
  else if (data.length === 2) return { sender: data[0], reciever: data[1] };
};

const findReciever = (arrayOfClients, recieverEmail, senderEmail) => {
  for (const client of arrayOfClients) {
    if (client.reciever === senderEmail && client.sender === recieverEmail)
      return client;
  }
};

const deleteConnection = (arrayOfClients, disconnectedClient) => {
  for (const client of arrayOfClients) {
    if (client.connection === disconnectedClient)
      arrayOfClients.splice(arrayOfClients.indexOf(client), 1);
  }
};

module.exports = { parseRequest, findReciever, deleteConnection };
