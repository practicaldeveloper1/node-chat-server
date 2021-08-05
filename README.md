# node-chat-server

A sample chat server that allows participants to submit an HTML form to connect with their name and preferred locale, and sends messages to everyone connected via Websockets. The message is translated to the selected locale before sending it out. Support multiple chatrooms with option of only admin (creator) to send messages.

# How to setup/run

1. We use DeepL API for message translation, so before running the server, you will need to sign up for a DeepL API account.
https://www.deepl.com/pro#developer
Please keep the auth_key.

2. On the root folder of the server, please create a .env file and add the parameters PORT (the port you want the server to listen) and DEEPL_AUTH_KEY (your DeepL auth_key) as below.

PORT=5000

DEEPL_AUTH_KEY=hjhjh-hjhjh-hjhjhj-hjhj-hjhjh:fx

3. On CMD or a terminal, go to the root folder of the project and run the following commands.

npm install

npm start

The server should start at the port you defined.
On browser open the root page e.g.(http://localhost:5000/) and then enter your username, locale and chatroom information.
