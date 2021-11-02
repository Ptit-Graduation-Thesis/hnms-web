export enum UserStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export const getUserStatusName = (status: UserStatus) => {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'Active'

    case UserStatus.INACTIVE:
      return 'Inactive'

    default:
      return ''
  }
}
