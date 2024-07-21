import { supabase } from "./init";

export async function getUserLogin(email: string) {
  const { data } = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .single();

  if (data) {
    return { status: true, data };
  } else {
    return { status: false, data: {} };
  }
}

export async function createUser({
  email,
  name,
  photo,
  username,
}: {
  email: string;
  name: string;
  photo: { url: string; path: string };
  username: string;
}) {
  const { status } = await supabase
    .from("users")
    .insert({ email, name, photo, username });

  if (status === 201) {
    return { status: true, message: "User registered successfully" };
  } else {
    return { status: false, message: "Failed to register user" };
  }
}

export async function uploadFile(
  tableName: string,
  file: File,
  pathFile: string
) {
  const result = await supabase.storage.from(tableName).upload(pathFile, file);

  return result;
}

export async function deleteFile(storageName: string, pathFile: Array<string>) {
  const result = await supabase.storage.from(storageName).remove(pathFile);

  return result;
}

export async function getUrlFile(path: string, bucketName: string) {
  const { data } = await supabase.storage
    .from(bucketName)
    .getPublicUrl(`${path}`);

  return data;
}

// export async function deleteFile(bucketName: string, path: string) {
//   const
// }
