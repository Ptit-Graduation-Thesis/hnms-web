export enum ItemType {
  PHONE = 1,
  TABLET = 2,
  LAPTOP = 3,
}

export const getItemTypeName = (type: ItemType | string) => {
  switch (type) {
    case ItemType.PHONE:
      return 'Phone'

    case ItemType.TABLET:
      return 'Tablet'

    case ItemType.LAPTOP:
      return 'Laptop'

    default:
      return ''
  }
}
