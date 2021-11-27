import { RcFile } from 'antd/lib/upload'

export const enumToArray = (enumValue: any, getName: (key: any) => string) => {
  const all: {value: string, name: string}[] = []
  Object.values(enumValue).forEach((item) => {
    const isKey = Number.isNaN(Number.parseInt(`${item}`, 10))
    if (isKey) all.push({ value: enumValue[item as any], name: getName(enumValue[item as any]) })
  })
  return all
}

export const getBase64 = (img: RcFile | undefined, callback: (result: string | ArrayBuffer | null) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img as Blob)
}
