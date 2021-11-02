export enum ActionType {
  UPDATE_COLLAPSE = '@APP/UPDATE_COLLAPSE',
}

export const updateCollapse = (payload: boolean) => ({
  type: ActionType.UPDATE_COLLAPSE,
  payload,
})
