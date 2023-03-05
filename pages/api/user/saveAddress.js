import nc from "next-connect";
import User from "../../../models/User";

import db from "@/utlis/db";
import auth from "../../../middleware/auth";
const handler = nc().use(auth);
// const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { address } = req.body;
    const user = await User.findById(req.user);
    // console.log(user);
    const d1 = await user.updateOne(
      {
        $push: {
          address: address,
        },
      }
      // { new: true }
    );
    // const userData = await user.address;
    db.disconnectDb();
    // console.log("user add", userData);
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
