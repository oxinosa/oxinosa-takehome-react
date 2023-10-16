export interface UserState {
  username: string,
  role: 'admin' | 'user' | 'platform_agent' | null,
  isActive: boolean,
  id: string
}