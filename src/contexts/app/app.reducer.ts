import { AppActionType, AppStateType } from '@/contexts/app/app.type'
import { ActionType } from '@/contexts/app/app.action'
import { getLocalStorage, LocalStorageKey } from '@/utils/storage'

export const initialState: AppStateType = {
  isCollapse: getLocalStorage(LocalStorageKey.IS_COLLAPSE) === 'true',
}

export const AppReducer = (state: AppStateType, action: AppActionType) => {
  switch (action.type) {
    case ActionType.UPDATE_COLLAPSE:
      return { ...state, isCollapse: action.payload }

    default:
      return state
  }
}
