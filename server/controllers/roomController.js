import Hotel from "../models/Hotel.js";
import {v2 as cloudinary} from "cloudinary";
import Room from "../models/Room.js";

export const createRoom = async(req, res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        console.log("files received:", req.files)
        console.log("user:", req.user._id)

        const hotel = await Hotel.findOne({owner: req.user._id})
        console.log("hotel found:", hotel)

        if(!hotel) return res.json({success:false, message:"No hotel found"});

        const uploadImages = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                    },
                    (error, result) => {
                        if(error) {
                            console.log("Cloudinary error:", error)
                            reject(error)
                        }
                        else resolve(result.secure_url)
                    }
                ).end(file.buffer)
            })
        })

        const images = await Promise.all(uploadImages)
        console.log("images uploaded:", images)

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        })
        res.json({success:true, message:"Room created successfully"})

    } catch (error) {
        console.log("createRoom error:", error)
        res.json({success:false, message:error.message})
    }
}

export const getRooms = async(req, res) => {
    try {
        const rooms = await Room.find({isAvailable:true}).populate({
            path:'hotel',
            populate:{
                path:'owner',
                select:'image'
            }
        }).sort({createdAt: -1})
        res.json({success:true, rooms});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export const getOwnerRooms = async(req, res) => {
    try {
        const hotelData = await Hotel.findOne({owner: req.user._id})
        if(!hotelData) return res.json({success:false, message:"No hotel found"});
        const rooms = await Room.find({hotel: hotelData._id.toString()}).populate("hotel");
        res.json({success:true, rooms});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export const toggleRoomAvailability = async(req, res) => {
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success:true, message:"Room availability updated"});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}