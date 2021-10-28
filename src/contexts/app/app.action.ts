export enum ActionType {
  TOGGLE_COLLAPSE = '@APP/TOGGLE_COLLAPSE',
}

export const toggleCollapse = () => ({
  type: ActionType.TOGGLE_COLLAPSE,
})
