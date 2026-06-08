import { redirect } from 'next/navigation'

export default function DownloadPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token
  if (token) {
    redirect(`/api/download?token=${token}`)
  }
  redirect('/')
}
