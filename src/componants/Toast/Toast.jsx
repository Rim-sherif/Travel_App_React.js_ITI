import toast from 'react-hot-toast';
export const notify = (msg,action) => {
    switch(action){
        case "success":
            toast.success(msg);
            break;
        case "error":
            toast.error(msg);
            break;
    }
}
