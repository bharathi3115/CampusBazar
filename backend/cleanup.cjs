const mongoose = require('mongoose');
mongoose.connect('mongodb://CampusBazar:CB%40123@ac-4w0qjiw-shard-00-00.jrsmzni.mongodb.net:27017,ac-4w0qjiw-shard-00-01.jrsmzni.mongodb.net:27017,ac-4w0qjiw-shard-00-02.jrsmzni.mongodb.net:27017/campusbazar?ssl=true&replicaSet=atlas-r28vi3-shard-0&authSource=admin&appName=Cluster0')
.then(async () => { 
  const db = mongoose.connection.db; 
  await db.collection('users').updateMany({ avatarUrl: { $regex: '^http://localhost' } }, { $set: { avatarUrl: null } }); 
  console.log('Cleaned up localhost avatars'); 
  process.exit(0); 
}).catch(console.error);
