export type DetailItem = {
  id: number
  name: string
  des: string
  price: number
  pictureKey: string
  pictureUrl: string
  quCode: string
  type: number
}

export type FilterItem = {
  type?: number
  keyword?: string
  page?: number
}
