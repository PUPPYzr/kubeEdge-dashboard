// import { request } from '@/helper/request';
// import { useQuery } from '@/hook/useQuery';

// interface KubernetesVersion {
//   major: string;
//   minor: string;
//   gitVersion: string;
//   gitCommit: string;
//   gitTreeState: string;
//   buildDate: string;
//   goVersion: string;
//   compiler: string;
//   platform: string;
// }

// export function useGetK8sVersion() {
//   return useQuery<KubernetesVersion>('getK8sVersion', `/version`, {
//     method: 'GET',
//   });
// }

// export function getVersion(token: string) {
//   return request<KubernetesVersion>(`/version`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }



import { request } from '@/helper/request';
import { useQuery } from '@/hook/useQuery';

// 统一取得后端地址
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_SERVER || 'http://127.0.0.1:8080';

interface KubernetesVersion {
  major: string;
  minor: string;
  gitVersion: string;
  gitCommit: string;
  gitTreeState: string;
  buildDate: string;
  goVersion: string;
  compiler: string;
  platform: string;
}

export function useGetK8sVersion() {
  return useQuery<KubernetesVersion>('getK8sVersion', '/version', {
    baseURL: API_BASE_URL,       // ✨ 加这一行
    method : 'GET',
  });
}

export function getVersion(token: string) {
  return request<KubernetesVersion>('/version', {
    baseURL: API_BASE_URL,       // ✨ 同样加
    method : 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
