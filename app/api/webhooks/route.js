/* eslint-disable camelcase */
import { Webhook } from "svix";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../../../lib/actions/user.actions";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.NEXT_PUBLIC_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  const body = await req.text();
  console.log(body);

  const sivx = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }

  const eventType = evt.type.toString();

  if (eventType === "user.created") {
    console.log("user created.....");
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    await createUser({
      clerkId: id,
      name: `${first_name}${last_name ? `${last_name}` : ""}`,
      username,
      email: email_addresses[0].email_address,
      picture: image_url,
    });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name}${last_name ? `${last_name}` : ""}`,
        username,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      path: `/profile/${id}`,
    });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    await deleteUser({
      clerkId: id,
    });
  }

  // Rest

  return new Response("", { status: 200 });
}
