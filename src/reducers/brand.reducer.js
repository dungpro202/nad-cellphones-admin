import { brandConstants } from "../actions/constants"

const initState = {
    brands: [],
    loading: false,
    error: null,
    notification: null,
}


//Xem lai bai 15 

const brandReducer = (state = initState, action) => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    switch (action.type) {
        case brandConstants.GET_ALL_BRANDS_SUCCESS:
            state = {
                ...state,
                brands: action.payload.brands,
                notification: null,
            }
            break;
        case brandConstants.ADD_NEW_BRANDS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        // case brandConstants.ADD_NEW_BRANDS_SUCCESS:
        //     const updateCategoris = buildNewCategories(action.payload.brand.parentId, state.categories, action.payload.brand);
        //     console.log(updateCategoris)
        //     state = {
        //         ...state,
        //         categories: updateCategoris,
        //         loading: false,
        //         notification: `Thêm mới Thành Công  ----  ${time}`
        //     }
        //     break;
        case brandConstants.ADD_NEW_BRANDS_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error,
                notification: `Thêm mới Thất Bại   ---- ${time}`
            }
            break;
        case brandConstants.UPDATE_BRANDS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case brandConstants.UPDATE_BRANDS_SUCCESS:
            state = {
                ...state,
                loading: false,
                notification: `Cập Nhật Thành Công  ----   ${time}`
            }
            break;
        case brandConstants.UPDATE_BRANDS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
                notification: `Cập Nhật Thất Bại   ---  ${time}`,
            }
            break;
        case brandConstants.DELETE_BRANDS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case brandConstants.DELETE_BRANDS_SUCCESS:
            state = {
                ...state,
                loading: false,
                notification: `Xóa Thành Công  ----   ${time}`,
            }
            break;
        case brandConstants.DELETE_BRANDS_FAILURE:

            state = {
                ...state,
                loading: false,
                notification: ` Xóa Thất Bại, Danh Mục Chứa SP   ${time}`,
            }
            break;
        default:
            break;
    }
    return state;
}

export default brandReducer