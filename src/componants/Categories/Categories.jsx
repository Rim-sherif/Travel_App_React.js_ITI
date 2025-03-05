import { useEffect, useState } from "react";
import CategoryLink from "./CategoryLink";
import { useDispatch, useSelector } from "react-redux";
import { getTripsBasedCategory } from "../../redux/reducers/heroCategoryTrips";
import CategoryCard from "./CategoryCard";

export default function Categories() {
    const [selectedId, setSelectedId] = useState(1);
    const [category, setCategory] = useState("culture");
    const dispatch = useDispatch();
    const {filteredTrips} = useSelector(store=>store.categoryTrips);
    console.log(filteredTrips);
    
    const categories = [
        { id: 1, icon: "fa-solid fa-monument", text: "Culture" },
        { id: 2, icon: "fa-solid fa-utensils", text: "Food" },
        { id: 3, icon: "fa-solid fa-mountain-sun", text: "Nature" },
        { id: 4, icon: "fa-solid fa-person-skating", text: "Sport" },
    ];

    useEffect(()=>{
        dispatch(getTripsBasedCategory({id: 1 , category: "Culture"}))
    } , [dispatch])

  function handleCategoryBg(id , category) {
    setSelectedId(id);
    setCategory(category);
    dispatch(getTripsBasedCategory({id , category}))
  }

  return (
    <>
        <div className="w-[80%] mx-auto flex">
          {categories.map((category) => (
            <CategoryLink
              key={category.id}
              selectedId={selectedId}
              handleCategoryBg={handleCategoryBg}
              category={category}
            />
          ))}
        </div>

        <div className="mt-0">
            <CategoryCard category={category} />
        </div>
    </>
  );
}
