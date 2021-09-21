import Vue from 'vue'

// axios
import axios from 'axios'

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGQyMzE4NTg0YWNmYTU4MGQxYjM1ZWM1NzczNTFlYThjYzY2ZTA4MjNhODdkMWZiODJlYjVlYWQxYTUxNzA1M2RhMjVmYTk0MGI2NzExMDEiLCJpYXQiOjE2MjczNjc3MjMsIm5iZiI6MTYyNzM2NzcyMywiZXhwIjoxNjU4OTAzNzIzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.Swq2EdjNWL7JrRZFu1Gh9x5ZHwo7jmCioZz4Z19IQB2rTIGUDyhkds276ZzPHh-pDwkrD2uEWhceOuXrKnlOwtvJOu3Kf3VymsabIKqJpb8e4dq76FWPbUD6k-WexL7QKQan9gH1LwoQey2nMKFi5hd7_3A9sFLRrQerqh3qugWdD7RqqYS3vYY9M3VqHf108w5iQa_GHkRx2KRv0PxRVRqofkTCBBf-Oc-kcvLkau8N6BVojkYDJ8Cl8uG5XcS0F1RjbNy6SuiuTyqq1BqaZmcasi87zwJEeuJSgdqBfnNch608impEBu9q_ON1kMIgK9LZvqL8_Uk1vP5qosUq39VgJj8qbFDpCKsKus6fjO78G-zeYbZ32D-s03QwPr9FkwoZXg_HaiyTDvsbTcgH63wU-Q7ycor8IgSKPsfkJN1OytohleJMWYOObiN-IKqKGbXnf85DnJrhZuOZB9tQdoq4fIXYx68LQgmiLSVemXUbHMtRmXbYWwAIFy3QexPRGtHxK8wCzqEH-whXh66RKBy31gf1Fu9wxHHEb95U_UfYYynbbDxapwurJHzgxUswdBWDNguNoAJZslZfwVMguAmgtylFvNYzIlEWkENTk5fcTNOJsmVWDYuO-QJyWwCStB7_a7jcPFHLqcs7pwu9cvV-X1__x0BgRD6E9VBfYQg'

const axiosIns = axios.create({
  // You can add your headers here
  // headers: new Headers({
  //   Authorization: `Bearer ${token}`,
  // }),
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 14000,
  headers: { 'Application-Name': 'Web Komerce' },
})

axiosIns.interceptors.response.use(
  response => response,
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 403) {
      window.location = '/unauthenticated'
    }
    /* eslint-disable comma-dangle */
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axiosIns

export default axiosIns
