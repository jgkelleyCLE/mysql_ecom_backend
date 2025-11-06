import { db } from "../DBConnection.js";

export const createOrder = async(req, res) => {

    const { user_id, title, order_items, event_date, subtotal, tax_price, total_price } = req.body

    console.log("FULL REQUEST BODY: ", req.body)
    console.log("ORDER DATA: ", user_id, title, order_items, event_date, total_price)

    try {

        const orderQuery = `
            INSERT INTO orders (user_id, title, event_date, subtotal, tax_price, total_price, completed) VALUES
            (?, ?, ?, ?, ?, ?, FALSE)
        `
        
        db.query(orderQuery, [user_id, title, event_date, subtotal, tax_price, total_price], (err, data) => {

            if(err){
                console.log(err)
                return res.status(400).json(err)
            }

            const orderId = data.insertId

            console.log("OrderId: ", orderId)

            //insert order items
            const itemsQuery = `
                INSERT into order_items (order_id, product_id, quantity, price) VALUES ?
            `

            const itemsData = order_items?.map(item => [
                orderId,
                item.product_id,
                item.cartQuantity || 1,
                item.price
            ])

            console.log("ITEMS DATAAAAAA: ", itemsData)

            // Only proceed if itemsData has content
            if (itemsData?.length === 0) {
                return res.status(400).json({ message: "No valid order items found" });
            }

            db.query(itemsQuery, [itemsData], (err, data)=> {
                if(err){
                    res.status(400).json({ message: "Error adding order items!" })
                }else {
                    res.status(201).json({
                            message: "Order created successfully",
                            order_id: orderId
                        });
                }
            })

        })
        


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//GET ALL ORDERS
export const getAllOrders = async(req, res) => {

    try {
        
        const q = "SELECT * FROM orders"

        db.query(q, (err, data)=> {

            if(err){
                console.log(err)
                return res.status(400).json("Error fetching orders")
            }else{
                return res.status(200).json(data)
            }


        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//get user's orders
export const getUserOrders = async(req, res) => {

    const userId = req.params.id

    try {
        const q = "SELECT * FROM orders WHERE user_id = ?"

        db.query(q, [userId], (err, data) => {
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

//get order by ID
export const getOrderById = async(req, res) => {

    const id = req.params.id

    console.log("ORDER ID: ", id)

    try {
        
        const q = `SELECT * FROM orders
                    WHERE order_id = ?
        `

        db.query(q, [id], (err, data)=> {
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

//get order items
export const getOrderItems = async(req, res) => {

    const orderId = req.params.id

    try {
        
        
        const q = `
            SELECT oi.order_id, oi.product_id, oi.quantity, p.price, p.product, image
            FROM order_items oi
            INNER JOIN products p
            ON oi.product_id = p.product_id
            WHERE oi.order_id = ?
        `

        db.query(q, [orderId], (err, data) => {
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

export const updateOrderStatus = async(req, res) => {

    const id = req.params.id
    const {status} = req.body

    try {
        const q = `
            UPDATE orders
            SET order_status = ?
            WHERE order_id = ?
        `

        db.query(q, [status, id], (err, data) => {

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