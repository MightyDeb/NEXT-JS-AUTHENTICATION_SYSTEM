const { default: mongoose } = require("mongoose")

const connectToDB = async ()=>{
  const connectionUrl= 'mongodb+srv://dMaity2005:root@cluster0.wu7zuwk.mongodb.net/'
  mongoose.connect(connectionUrl).then(()=> console.log('Auth database connected successfully')).catch(error=>console.log(error))
}

export default connectToDB;
