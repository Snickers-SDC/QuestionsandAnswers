FROM node:latest

WORKDIR /Users/felipeerazo/hackReactor/Senior/sdc/QuestionsandAnswers

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]