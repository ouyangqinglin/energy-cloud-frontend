export interface RequestCommonRes<T> {
  code: number
  msg?: any
  data: T
}
