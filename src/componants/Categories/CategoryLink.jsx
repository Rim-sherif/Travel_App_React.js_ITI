
export default function CategoryLink({handleCategoryBg , category , selectedId}) {
  return (
    <div onClick={()=>handleCategoryBg(category.id , category.text)} className={`w-1/4 ${selectedId == category.id ? 'bg-white text-black' : "text-white"} rounded text-center text-2xl cursor-pointer p-5 mt-[-70px] mb-20`}>
        <i className={category.icon}></i>
        <strong className="ms-3">{category.text}</strong>
    </div>
  )
}
