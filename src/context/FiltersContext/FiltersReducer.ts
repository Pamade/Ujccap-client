import { SortWithTypes, State, EmptyState } from "./FiltersContext";
import { Actions } from "./Actions";

export const FiltersReducer = (state: State, action: Actions) => {
    let { sort } = state;
    let currentItem: SortWithTypes | undefined = {} as SortWithTypes;
  
    switch (action.type) {
      case "UPDATE_TEXT_OR_NUMBER_INPUT":
        return {
          ...state,
          [action.field]: action.payload,
          page: 1,
        };
      case "UPDATE_CATEGORIES":
        return { ...state, categories: action.payload, page: 1 };
      case "SWITCH_HAS_IMAGE":
        return { ...state, hasImage: !state.hasImage, page: 1 };
      case "SWITCH_SHOW_EXPIRED":
        return { ...state, showExpired: !state.showExpired, page: 1 };
      case "UPDATE_SORT":
        console.log(action.payload)
        if (typeof sort !== "string" && sort) {    
          currentItem = sort.find(
            (item) => item.type === action.typeSort
          ) 
          if (currentItem) {
            if (action.payload.value) {
              const id = sort.indexOf(currentItem);
              sort[id] = action.payload;
            } else {
              sort = sort.filter((item) => item.type !== action.typeSort);
            }
          } else  {
            sort.push(action.payload);
          }
        } else  {
          sort = []
          sort.push(action.payload);
        }
        return { ...state, sort, page: 1 };
      case "SET_PAGE":
        return { ...state, page: action.payload };
      case "NEXT_PAGE":
        return { ...state, page: Number(state.page) + 1 };
      case "PREVIOUS_PAGE":
        return { ...state, page: Number(state.page) - 1 };
      case "RESET_STATE":
        return EmptyState
      default:
        return state;
    }
  };

  