import { formatDistanceToNowStrict, format } from "date-fns";

export const queryPosting = `*, comment:postings (count), like:likes!id(count), repost:reposts!id(count), creator:users (name, username, photo, bio, followers:follow_follow_to_fkey (count), followings:follow_user_id_fkey (count))`;
export function dateConverterNow(date: Date | string): string {
  return formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
  });
}

export function dateFormat(date: Date | string): string {
  return format(new Date(date), "MMMM, dd yyyy");
}

export function textCapitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
