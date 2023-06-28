import supabase from "src/services/supabase";

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
