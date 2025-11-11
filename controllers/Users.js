import { db } from "../DBConnection.js";

export const registerUser = async(req, res) => {

    const { username, password, city, state, zip, latitude, longitude, bgColor } = req.body


    try {

        const userCheck = "SELECT * FROM users WHERE username = ?"
        db.query(userCheck, [username], (err, data)=> {
            
            //check if username exists
            if(data.length > 0){
                return res.status(400).json({ message: "A user with that username already exists!" })
            }

            const q = "INSERT INTO users (username, password, city, state, zip, latitude, longitude, bgColor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

        db.query(q, [username, password, city, state, zip, latitude, longitude, bgColor], (err, data) => {

            if(err){
                console.log(err)
                return res.status(400).json(err)
            }else {
                // console.log("REGISTER DATA BACKEND: ", data)
                // return res.status(201).json(data)
                 const getUserQuery = "SELECT * FROM users WHERE user_id = ?"
                    db.query(getUserQuery, [data.insertId], (err, userData) => {
                        if(err){
                            console.log(err)
                            return res.status(400).json(err)
                        }
                        
                        const user = userData[0]
                        
                        // Remove password from response
                        const { password: userPassword, ...userWithoutPassword } = user;

                        return res.status(201).json({
                            user: userWithoutPassword
                        })
                    })
            }

        })

        })
        
        

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const loginUser = async(req, res) => {

    const { username, password } = req.body

    if(!username || !password){
        return res.status(400).json({ message: "Database error" })
    }


    try {

        
        const q = "SELECT * FROM users WHERE username = ?"

        db.query(q, [username], (err, data) => {

            if(err){
                console.log(err)
                return res.status(400).json(err)
            }

            //check if user exists
            if(data.length === 0){
                return res.status(400).json({ message: "User not found!" })
            }

            const user = data[0]

            if(user?.password != password){
                return res.status(401).json({ message: "Invalid username or password!" })
            }

             // Remove password from response
            const { password: userPassword, ...userWithoutPassword } = user;

            return res.status(200).json({
                user: userWithoutPassword
            })

        })
        


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const updateUser = async(req, res) => {

    const id = req.params.id

    const { username, bgColor } = req.body

     // Validate input
    if (!username || !bgColor) {
        return res.status(400).json({ message: "Username and bgColor are required" });
    }

    try {
        
        const q = `
            UPDATE users
            SET username = ?, bgColor = ?
            WHERE user_id = ?
        `

        db.query(q, [username, bgColor, id], (err, data) => {
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