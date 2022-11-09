export default async function uploadImg(file, setImageUrl) {
    // Upload image on cloudinary
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", "blogx-imgs");
    formdata.append("cloud_name", "dzgkrzjor");
    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzgkrzjor/image/upload",
        {
            method: "POST",
            body: formdata,
        }
    );
    const data = await res.json();
    console.log("data", data);
    setImageUrl(data.secure_url);
    console.log(data.secure_url);
    return data.secure_url;
}