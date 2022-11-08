export default async function uploadImg(file, setImageUrl) {
    // Upload image on cloudinary
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", "blogx-imgs");
    formdata.append("cloud_name", "dzgkrzjor");
    const data = await fetch(`https://api.cloudinary.com/v1_1/dzgkrzjor/image/upload`, {
        method: 'POST',
        body: formdata
    }).then(r => r.json()
    ).then(data => {
        console.log(data);
        setImageUrl(data.secure_url);
        return data;
    }  );
}