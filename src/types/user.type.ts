export type DetailUser = {
  id: number
  fullName: string,
  username: string,
  phoneNumber: string,
  address: string,
  credentialId: string,
  dob: string,
  salary: number,
  status: number,
  roleId: number,
  branchId: number,
  role: {id: number, name: string},
  branch: {id: number, name: string}
}

export type FilterUser = {
  roles?: number[]
  branchs?: number[]
  status?: number
  keyword?: string
  page?: number
}

export type SearchUser = {
  role?: string
  branch?: string
}
