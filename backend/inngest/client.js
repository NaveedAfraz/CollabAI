import { inngest } from "inngest";

const inngestClient = new inngest.Client({
  id: "ticking-system",
});

export default inngestClient;
