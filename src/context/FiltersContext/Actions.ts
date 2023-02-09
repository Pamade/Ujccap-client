import { FilterCategory, UpdateSortFields, SortWithTypes, InputFieldsTextNumber } from "./FiltersContext";

interface UpdateStringValues {
    type: "UPDATE_TEXT_OR_NUMBER_INPUT";
    field: InputFieldsTextNumber;
    payload: string | number;
  }
  
  interface UpdateCategories {
    type: "UPDATE_CATEGORIES";
    payload: FilterCategory[];
  }
  interface UpdateSort {
    type: "UPDATE_SORT";
    typeSort: UpdateSortFields;
    payload: SortWithTypes;
  }
  
  interface HasImage {
    type: "SWITCH_HAS_IMAGE";
  }
  interface ShowExpired {
    type: "SWITCH_SHOW_EXPIRED"
  }

  interface SetPage {
    type:'SET_PAGE',
    payload:number
  }
  interface NextPage {
    type:'NEXT_PAGE'
  }

  interface PreviousPage {
    type:'PREVIOUS_PAGE'
  }

  interface ResetState {
    type:'RESET_STATE'
  }

  export type Actions =
    | UpdateCategories
    | UpdateStringValues
    | HasImage
    | UpdateSort
    | SetPage
    | NextPage
    | PreviousPage
    | ShowExpired
    | ResetState
  
    