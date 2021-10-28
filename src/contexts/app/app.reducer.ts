import { AppActionType, AppStateType } from '@/contexts/app/app.type'
import { ActionType } from '@/contexts/app/app.action'

export const initialState: AppStateType = {
  isCollapse: false,
}

export const AppReducer = (state: AppStateType, action: AppActionType) => {
  switch (action.type) {
    case ActionType.TOGGLE_COLLAPSE:
      return { ...state, isCollapse: !state.isCollapse }

    default:
      return state
  }
}
