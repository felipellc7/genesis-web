import { AxiosResponse, CancelToken } from "axios"
import axiosClient from "@Config/axios"
import { urlApiUsers } from "@Helpers/envConstants"
import tokenAuth from "@Config/token"

const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

export async function myAccountInfo(token: string, cancelToken: CancelToken): Promise<AxiosResponse> {
  tokenAuth(token)
	const url: any =  `${urlApiUsers}/me`
	let result = await axiosClient.get(url, {
		headers, cancelToken
	})
	return result;
}