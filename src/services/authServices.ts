import { AxiosResponse, CancelToken } from "axios"
import axiosClient from "@Config/axios"
import { urlApiUsers } from "@Helpers/envConstants"
import { ICredentials } from "@Interfaces/authInterface"
import { IResponseService } from "@Interfaces/serviceInterface"

const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

export async function authenticateUser(credentials: ICredentials, cancelToken: CancelToken): Promise<AxiosResponse> {
	const url: any =  `${urlApiUsers}/sign_in`
  console.log(url)
	let result = await axiosClient.post(url, {user: credentials}, {
		headers, cancelToken
	})
	return result;
}