import mongoose from"mongoose"

 export async function   connectDb(){

try {
  const db =   await mongoose.connect('mongodb+srv://riteshvermaghd21:ritesh21@cluster0.zy1he.mongodb.net/ss');
  console.log("db connected");
  

} catch (error) {
  console.log("mongo connection error  :" , error);
  
}
}




