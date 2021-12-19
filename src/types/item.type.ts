import { DetailBranch } from './branch.type'

export type DetailItem = {
  id: number
  name: string
  des: string
  price: number
  pictureKey: string
  pictureUrl: string
  qrCode: string
  type: number
  branchItems: {
    id: number
    amount: number
    branch: DetailBranch
  }[]
}

export type FilterItem = {
  type?: number
  keyword?: string
  page?: number
}
