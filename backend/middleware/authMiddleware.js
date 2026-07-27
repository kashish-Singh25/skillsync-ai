// import jwt from "jsonwebtoken";


// const authMiddleware = (req,res,next)=>{


//     try{


//         const token = req.headers.authorization?.split(" ")[1];


//         if(!token){

//             return res.status(401).json({

//                 success:false,
//                 message:"No token provided"

//             });

//         }



//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );



//         req.student = decoded;



//         next();



//     }
//     catch(error){


//         return res.status(401).json({

//             success:false,
//             message:"Invalid token"

//         });


//     }


// };


// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Decoded Token:", decoded);
    console.log("========== AUTH ==========");
console.log("Authorization Header:", req.headers.authorization);
console.log("Decoded Token:", decoded);
console.log("==========================");

    // Store logged in user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;