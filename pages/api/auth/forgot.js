import nc from "next-connect";
import db from "@/utlis/db";
import bcrypt from "bcrypt";
import { validateEmail } from "@/utlis/validation";
import { createResetToken } from "@/utlis/tokens";
import User from "@/models/User";
import { sendEmail } from "@/utlis/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";
const handler = nc();
handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist." });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    sendEmail(email, url, "", "Reset your password", resetEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: "Please check your email inbox to reset password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default handler;
