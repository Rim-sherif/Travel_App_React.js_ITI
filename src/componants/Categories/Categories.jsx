
export default function Categories() {
    // <i class="fa-solid fa-person-skating"></i>
    // <i class="fa-solid fa-utensils"></i>
    // <i class="fa-solid fa-house"></i>
    // <i class="fa-solid fa-mountain-sun"></i>
    // <i class="fa-solid fa-monument"></i>
    const categories = [
        {icon: "fa-solid fa-monument" , text: "Culture"},
        {icon: "fa-solid fa-utensils" , text: "Food"},
        {icon: "fa-solid fa-mountain-sun" , text: "Nature"},
        {icon: "fa-solid fa-person-skating" , text: "Sport"},
    ]
  return (
    <div className="w-[80%] mx-auto flex">
        {categories.map((category,index)=><div className="w-1/4 text-center text-2xl text-white cursor-pointer p-10 mt-[-100px] mb-20" key={index}>
            <i class={category.icon}></i>
            <strong className="ms-3">{category.text}</strong>
        </div>)}
    </div>
  )
}
