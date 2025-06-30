import { NonRetriableError } from "inngest";
import { inngest } from "../client.js";
import User from "../../models/users.js"; 
import { sendEmail } from "../../utils/mailer.js";
export const onSignUp = inngest.createFunction(
  {
    id: "onSignUp",
    retries: 3,
  },
  {
    event: "user/signUp",
  },
  async ({ event, step }) => {
    try {
      const { email, password } = event.data;
      const getUser = await step.run("getUser", async () => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new NonRetriableError("User no longer exists in our database");
        }
        return user;
      });
     console.log(email);
     
      await step.run("sendWelcomeEmail", async () => {
        await sendEmail({
          to: email,
          subject: "Welcome to our app",
          message: `Welcome to our app ${getUser.email}`,
        });
      });
      return { success: true };
    } catch (error) {
      console.error("Error in onSignUp function: " + error);
      return { success: false };
    }
  }
);
