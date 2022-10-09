export interface Product {
  id?: string,
  title: string,
  price: number,
  year: string,
  image?: string,
  description: string,
  configure: Config,
}

export interface Config {
    chip: string,
    memory: string,
    SSD: string,
}