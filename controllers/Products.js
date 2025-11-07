import { db } from "../DBConnection.js";


export const getProducts = async(req, res) => {

    try {
        
        const q = "SELECT * FROM products"


     db.query(q, (err, data) => {
            if(err){
                console.log("ERROR: ", err)
                return res.status(400).json(err)
            }else {
                return res.status(200).json(data)
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//active products only
export const getProductsByCategory = async(req, res) => {

    const category = req.params.category

    try {
        
        const q = `
            SELECT * FROM products
            WHERE category = ? && status = 'Active'
        `
        db.query(q, [category], (err, data) => {
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

export const getProduct = async(req, res) => {

    const id = req.params.id

    try {
        
        const q = "SELECT * FROM products WHERE product_id = ?"

        db.query(q, [id], (err, data) => {
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

export const searchProducts = async(req, res) => {

    const { query } = req.query

        if(!query){
            return res.status(400).json({ message: "Search query is required!" })
        }

    try {
        
        const searchTerm = `${query}%`

        const q = `
            SELECT * FROM products
            WHERE (product LIKE ? OR tags LIKE ? OR category LIKE ? OR tentType LIKE ?)
            AND status = 'Active'
            ORDER BY product ASC
        `

        db.query(q, [searchTerm, searchTerm, searchTerm, searchTerm], (err, data)=> {
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

export const updateProductStatus = async(req, res) => {

    const id = req.params.id
    const {status} = req.body

    console.log("PRODUCT ID: ", id)
    console.log("PRODUCT STATUS: ", status)

    try {
        
        const q = `
            UPDATE products
            SET status = ?
            WHERE product_id = ?
        `

        db.query(q, [status, id], (err, data)=> {
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