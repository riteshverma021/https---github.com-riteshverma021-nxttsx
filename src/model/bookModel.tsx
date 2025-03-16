import mongoose, { SchemaType } from "mongoose";
const  Schema = mongoose.Schema
interface datatype{
    title :String,
    price:Number,
    isbn:Number,
    description:String,
    publish:Number,
    edition:Number
}


const bookSchema = new Schema<datatype>({

    title: { type: String, required: true },
    price: { type: Number, required: true },
    isbn: { type: Number, required: true, unique: true }, 
    description: { type: String, required: true },
    publish: { type: Number, required: true },
    edition: { type: Number, required: true },

})

const ExBook = mongoose.models.Book || mongoose.model<datatype>("Book" , bookSchema)

export default ExBook;