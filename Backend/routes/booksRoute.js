import express from 'express';
import { Book } from '../Models/BookModel.js';

const router = express.Router();

// Route for saving a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, publishedYear } = req.body;

        if (!title || !author || !publishedYear) {
            return res.status(400).send({
                message: "Please provide all required fields: title, author, publishedYear"
            });
        }

        // Create a new book instance
        const newBook = new Book({ title, author, publishedYear });
        
        // Save the book to the database
        await newBook.save();

        res.status(201).send({ message: "Book saved successfully", book: newBook });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for get All Books from database
router.get('/',async(req,res)=>{
    try{
        const books=await Book.find({})
        return res.status(200).json({
            count:books.length,
            data:books,
        })

    }catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})



// Route for get all books from database by id
router.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const book= await Book.findById(id) ;
        return res.status(200).json( book)
       }
       catch (error){
        console.log(error.message);
        res.status(500).send({ message: error.message });
       }

}
);


// route for update
router.put('/:id',async(req,res)=>{
    try{

        const { title, author, publishedYear } = req.body;

        if (!title || !author || !publishedYear) {
            return res.status(400).send({
                message: "Please provide all required fields: title, author, publishedYear"
            });
        }
        const {id}=req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).json({message:'book not found'})
        }
      return res.status(200).send({ message: "Book saved successfully"});
    }catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:'book not found'});
        }
        return res.status(200).send({message:'Book Deleted Succesfully'})
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})    }
});
export default router;