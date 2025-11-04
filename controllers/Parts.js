import { db } from "../DBConnection.js";


export const getParts = async(req, res) => {

    const productId = req.params.id

    try {
        
        const q = "SELECT * FROM parts WHERE product_id = ?"

        db.query(q, [productId], (err, data)=> {

            if(err){
                console.log(err)
                return res.status(400).json(err)
            }else {
                return res.status(200).json(data)
            }

        })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}