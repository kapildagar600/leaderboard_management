const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const http = require('http') //for creating custom http server
const {Server} = require('socket.io')
const userRoutes = require('./routes/userRoutes')
const claimRoutes = require('./routes/claimRoutes')
const leaderboardRoutes = require('./routes/leaderboardRoutes');


dotenv.config()
require('./config/db')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})
app.set('io', io);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes);
app.use('/api/claim',claimRoutes);
app.use('/api/leaderboard',leaderboardRoutes);

app.get('/',(req,res)=>{
    res.send('leaderboard management api is running')
})

io.on('connection',(socket) => {
    console.log('New client connected', socket.id);

    socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
})


server.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on PORT:${process.env.PORT}`)
})