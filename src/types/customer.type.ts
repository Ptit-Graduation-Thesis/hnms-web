export type FilterCustomer = {
  keyword?: string
  page?: number
}

export type DetailCustomer = {
  id: number
  fullName: string
  dob: string
  phoneNumber: string,
  address: string,
}
