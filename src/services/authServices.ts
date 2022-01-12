import { AxiosResponse, CancelToken } from "axios"
import axiosClient from "@Config/axios"
import { urlApiUsers } from "@Helpers/envConstants"
import { ICredentials } from "@Interfaces/authInterface"
import { IResponseService } from "@Interfaces/serviceInterface"
import tokenAuth from "@Config/token"

const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

export async function authenticateUser(credentials: ICredentials, cancelToken: CancelToken): Promise<AxiosResponse> {
	const url: any =  `${urlApiUsers}/sign_in`
  console.log(url)
	let result = await axiosClient.post(url, {user: credentials}, {
		headers, cancelToken
	})
	return result;
}

export async function validateToken(token: string): Promise<AxiosResponse> {
  tokenAuth(token)
	const url: any =  `${urlApiUsers}/validate_token`
	let result = await axiosClient.get(url, {
		headers
	})
	return result;
}