import { request } from '@/helper/request';
import { useQuery } from '@/hook/useQuery';


// export function runKeink() {
//   return request<string>(`/keink/run`, {
//     baseURL: '',
//     method: 'GET',
//   });
// }

// export function useKeinkRunnable() {
//   return useQuery<{ ok: boolean }>('isKeinkRunnable', `/keink/check`, {
//     baseURL: '',
//     method: 'GET',
//   });
// }


const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_SERVER || 'http://localhost:8080';

export function runKeink() {
  return request<string>('/keink/run', {
    baseURL: API_BASE_URL,   // ← 变量，不加引号
    method: 'GET',
  });
}

export function useKeinkRunnable() {
  return useQuery<{ ok: boolean }>('isKeinkRunnable', '/keink/check', {
    baseURL: API_BASE_URL,
    method: 'GET',
  });
}

