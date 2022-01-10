export interface IResponseService<TResult> {
  status: string
  message: TResult
}