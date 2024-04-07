export default function useCreatePathname(userRegisteredId: number) {
  return `file_transaction_${userRegisteredId}_${new Date().getTime()}`
}
