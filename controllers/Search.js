import { db } from "../DBConnection.js";

export const createSearch = async(req, res) => {


    const { term, user_id, results_count, result_ids } = req.body

    try {
        
        const q = `
            INSERT INTO searches (term, user_id, results_count) VALUES (?, ?, ?)

        `

        db.query(q, [term, user_id, results_count], (err, data) => {
            if(err){
                console.log(err)
                return res.status(400).json(err)
            }
            // else {
            //     return res.status(201).json(data)
            // }
            const searchId = data.insertId

            const itemsQuery = `
                INSERT INTO search_items (search_id, product_id)
                VALUES ?
            `

        const searchData = result_ids.map(item => [
            searchId,
            item
        ])

        

        if(searchData?.length === 0){
            return res.status(400).json({ message: "No search results found" })
        }

        db.query(itemsQuery, [searchData], (err, data) => {
            if(err){
                console.log("ERROR INSERTING data: ", err)
                return res.status(400).json(err)
            }else {
                return res.status(201).json(data)
            }
        })


        })

        

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//get all searches
export const getAllSearches = async(req, res) => {

    try {

        // const q = "SELECT * FROM searches s ORDER BY created_at DESC"
        const q = `
            SELECT s.search_id, s.user_id, s.term, s.results_count, s.created_at, u.bgColor, u.username 
            FROM searches s
            INNER JOIN users u
            ON u.user_id = s.user_id
            ORDER BY created_at DESC
        `

        db.query(q, (err, data) => {
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

export const getSearchById = async(req, res) => {

    const id = req.params.id

    try {

        const q = `
            SELECT * FROM searches s
            INNER JOIN users u
            ON u.user_id = s.user_id
            WHERE search_id = ?
        `

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

export const getSearchDetails = async(req, res) => {

        const id = req.params.id

    try {
        
        const q = `
            SELECT p.product_id, p.product, p.price, p.image 
            FROM search_items si
            INNER JOIN products p
            ON p.product_id = si.product_id
            WHERE search_id = ?
        `
        
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

