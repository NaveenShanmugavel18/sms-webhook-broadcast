# sms-webhook-broadcast
Webhook to filter the users coming in through the API based on the rules specified and then send an SMS to the users passing the filters.

# Requirements
- Node JS
- Express JS
- MongoDB
- pm2 (for process management)

# Installation
- Clone the repo: `https://github.com/NaveenShanmugavel18/sms-webhook-broadcast.git`
- Install dependencies: `npm install`
- Start the server: `pm2 start development.json`

# Description
- Navigate to localhost:3000 in your browser after starting the development.json file.
- Trigger View: A view where the user can specify the data he/she is sending in the request's JSON body (incoming data). For example, the user can specify the following fields like Name, Mobile, Alternate Mobile, Cart items, Cart total
- Filter view: ​A view where the user can filter the "incoming data"
- Action view: ​A view where the user can specify the ​"incoming data" field which has the phone number to send the SMS to. The user should also be able to specify the SMS body
- On submitting you will be provided with an API Endpoint to post the data (specified in Trigger View).
- If the filter is passed, sms will be sent to the user's mobile number (specified in action view).
- GET Request can be made to the API Endpoint generated to get the datas such as No. of times webhook was hit , No. of times filters passed, No. of SMS sent.
