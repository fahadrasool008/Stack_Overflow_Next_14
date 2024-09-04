// /* eslint-disable camelcase */
// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import {
//   updateUser,
//   createUser,
//   deleteUser,
// } from "../../../lib/actions/user.actions";

// export async function POST(req) {
//   // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
//   const WEBHOOK_SECRET = process.env.NEXT_PUBLIC_CLERK_WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Get the headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error occurred -- no svix headers", {
//       status: 400,
//     });
//   }

//   // Get the body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   // Create a new Svix instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt;

//   // Verify the payload with the headers
//   try {
//     console.log("try payload svix");
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Error occurred", {
//       status: 400,
//     });
//   }

//   const eventType = evt.type.toString();

//   if (eventType === "user.created") {
//     console.log("user created.....");
//     const { id, email_addresses, image_url, username, first_name, last_name } =
//       eventType.data;

//     await createUser({
//       clerkId: id,
//       name: `${first_name}${last_name ? `${last_name}` : ""}`,
//       username,
//       email: email_addresses[0].email_address,
//       picture: image_url,
//     });
//   }

//   if (eventType === "user.updated") {
//     const { id, email_addresses, image_url, username, first_name, last_name } =
//       eventType.data;

//     await updateUser({
//       clerkId: id,
//       updateData: {
//         name: `${first_name}${last_name ? `${last_name}` : ""}`,
//         username,
//         email: email_addresses[0].email_address,
//         picture: image_url,
//       },
//       path: `/profile/${id}`,
//     });
//   }

//   if (eventType === "user.deleted") {
//     const { id } = eventType.data;

//     await deleteUser({
//       clerkId: id,
//     });
//   }

//   return new Response("", { status: 200 });
// }

import { Webhook } from "svix";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = "whsec_bJKN+QnEk6au8s5y46plxrjIOyTEOlxs";

export default async function handler(req, res) {
  const payload = (await buffer(req)).toString();
  const headers = req.headers;

  const wh = new Webhook(secret);
  let msg;
  try {
    msg = wh.verify(payload, headers);
    console.log(msg);
  } catch (err) {
    res.status(400).json({});
  }

  // Do something with the message...

  res.json({});
}
