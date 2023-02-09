import sport from "../images/categories/sport.png"
import houses from "../images/categories/house.png"
import fashion from "../images/categories/fashion.png"
import furnitures from "../images/categories/furnitures.png"
import health from "../images/categories/health.png"
import pets from "../images/categories/pets.png"
import forKids from "../images/categories/kids.png"
import electronics from "../images/categories/electronics.png"
import music from "../images/categories/music.png"
import education from "../images/categories/education.png"
import other from "../images/categories/other.png"
export interface CategoriesValuesType  {value:string, label:string, icon?:string}


export  const categoriesValues:CategoriesValuesType[] = [
  {value:'sport', label:'Sport', icon:sport},
  {value:'houses', label:'Houses', icon: houses},
  {value:'fashion', label:'Fashion', icon: fashion},
  {value:'furnitures', label:'Furnitures', icon: furnitures},
  {value:'health', label:'Health', icon: health},
  {value:'pets', label:'Pets', icon: pets},
  {value:'for-kids', label:'For Kids', icon: forKids},
  {value:'electronics', label:'Electronics', icon: electronics},
  {value:'music', label:'Music', icon: music},
  {value:'education', label:'Education', icon: education},
  {value:'other', label:'Other', icon: other},
] 