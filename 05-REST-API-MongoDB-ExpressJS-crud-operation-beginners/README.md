# Terminal
npm init -y
npm i express
npm i ejs
npm i mongoose
npm i method-override
touch index.js


# index.js
basic setup codes

# Terminal
nodemon index.js

# Creating Model

Chat will have : _id, from, to, message, created_at

we will store different collection(model) in "models" folder

inside this folder we will create "chat.js" in which we will have model name "Chat"


# init.js

first require model from chat.js
one time we run this init.js in which we will save sample data in mongoDB


# Index Route - Show all Chats - GET - /chats - index.ejs

# New Route - Create new Chat - GET - /chats/new - new.ejs
# New Route - add new chat in DB - POST - /chats

# Edit Route - Edit Chat - GET - /chats/:id/edit - edit.ejs
# Edit Route - Update chat in DB - PUT - /chats/:id

# Destroy Route - Delete chat in DB - DELETE - /chats/:id