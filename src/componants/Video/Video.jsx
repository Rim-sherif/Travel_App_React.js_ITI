export default function Video(){
    return(
        <div className="flex justify-center my-5">
        <video width="80%" height="auto" className="rounded-2xl" loop autoPlay muted>
            <source src="/3576378-uhd_3840_2160_25fps.mp4" type="video/mp4"/>
        </video>
     </div>
    )
}