import supabase, { SUPABASE_URL } from "src/services/supabase";
const SUPABASE_BUCKET_PATH = "storage/v1/object/public";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);

    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);

    throw new Error("Cabins could not be loaded");
  }
};
// export default getCabins;

export const createEditCabin = async (newCabin, id) => {
  console.log(newCabin, id);
  const hasImagePath = newCabin?.image?.startsWith?.(SUPABASE_URL);
  //Uploading image to supabase
  //1. Create unique image name
  // 0.6-plane.jpg
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    ""
  );

  console.log(newCabin, { id });
  // 2. Create Image path

  //https://bziofsjhtovijyssjcxb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2023-06-30T07%3A29%3A22.059Z
  const imagePath = hasImagePath
    ? newCabin?.image
    : `${SUPABASE_URL}/${SUPABASE_BUCKET_PATH}/cabin-images/${imageName}`;
  //1. Create Cabin

  let query = supabase.from("cabins");

  //CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);

    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  //2. Upload image

  // const avatarFile = event.target.files[0];
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin if there is error uploading the image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);

    console.log(error);

    throw new Error(
      "Cabins image could not be uploaded, hence cabin wa snot created"
    );
  }
  return data;
};

// export const updateCabin = async (newCabin) => {
//   const { data, error } = await supabase
//     .from("cabins")
// .update({ other_column: "otherValue" })
// .eq("some_column", "someValue")
// .select();

//   if (error) {
//     console.log(error);

//     throw new Error("Cabins could not be loaded");
//   }
// };
