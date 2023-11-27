import React, {FormEvent, useState, useEffect} from 'react'
import { api } from '~/utils/api'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '~/utils/firebase';
import { useRouter } from 'next/router'
import ReactQuill from "react-quill";  
import 'react-quill/dist/quill.snow.css';

export default function AddPost(){
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('movies')
    const [file, setFile] = useState<string | null>(null);
    const [media, setMedia] = useState('');
    const categories = api.categories.get.useQuery();
    const post = api.posts.createPost.useMutation();
    const router = useRouter();

    // const { data: sessionData, status } = useSession();
    // const user = api.users.getUser.useQuery();
    // const isAdmin = user.data?.filter((u) => {
    //     if(u.id === sessionData?.user.id && u.role ==='Admin'){
    //         return u;
    //     }
    // })

    useEffect(() => {
    const storage = getStorage(app);
      const upload = () =>{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-plus-operands, @typescript-eslint/unbound-method
        const name:string = new Date().getTime() + file.name;
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
            console.log('Upload is paused');
            break;
            case 'running':
            console.log('Upload is running');
            break;
        }
        }, 
        (error) => {
            console.log(error)
        // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setMedia(downloadURL);
            }).catch((error) =>{
                console.error('Error:', error)
            });
        }
    );
    }
        file && upload();
    }, [file])
    
    const slugify = (str:string) =>{
        return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(title, desc, category, media)
        const res = await post.mutateAsync({
            title,
            desc,
            slug: slugify(title),
            catSlug: category,
            img: media,
        })
        if(res){
            router.push(`/${category}/${slugify(title)}`)
        }
    }
    return (
        <div className='text-center'>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="flex flex-col items-center justify-center text-white" onSubmit={handleSubmit}>
        <h1 className='text-2xl text-white'>Create a new post: </h1>
            <div className='mt-4'>
                <label>
                    Title:
                    <input
                        type="text"
                        className="text-white border-b outline-none bg-inherit sm:ml-1"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                </label>
                <label className='ml-2'>
                    Category:
                    <select className='text-white border-b outline-none bg-inherit sm:ml-1' required onChange={(e)=> setCategory(e.target.value)} value={category}>
                    {categories.data?.map((cat)=>(
                        <option key={cat.id} value={cat.title}>{cat.title}</option>
                    ))}
                    </select>
                </label>
            </div>
            <div className='ml-3 pt-2'>
                <label htmlFor="">
                    Image:
                </label>
                <input type='file' className='pl-1' onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className='sm:flex sm:flex-row sm:mt-4 sm:w-1/2 w-full'>
            <label>
                Body:
            </label>
                {/* <textarea
                    rows={4}
                    className="block p-2.5 w-full text-sm text-white bg-inherit rounded-lg border"
                    required
                    onChange={(e)=> setDesc(e.target.value)}
                    value={desc}
                /> */}
                <div className='w-full'>
                    <ReactQuill
                    theme='snow'
                    value={desc}
                    onChange={(value) => setDesc(value)}
                    />
                </div>
            </div>
            <button type='submit' className='px-10 mt-4 text-purple-800 bg-white rounded hover:text-white hover:bg-purple-800 text-center'>Post</button>
        </form>            
        </div>
    )
}
