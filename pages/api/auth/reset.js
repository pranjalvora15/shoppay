import nc from "next-connect";
import db from "@/utlis/db";
import bcrypt from "bcrypt";
import { validateEmail } from "@/utlis/validation";
import { createResetToken } from "@/utlis/tokens";
import User from "@/models/User";
import { sendEmail } from "@/utlis/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";
const handler = nc();
handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const { userId,password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "This account does not exist." });
    }
    const cryptedPassword = await bcrypt.hash(password,10)
    await user.updateOne({
        password:cryptedPassword
    })
    res.json({email:user.email})
    await db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
