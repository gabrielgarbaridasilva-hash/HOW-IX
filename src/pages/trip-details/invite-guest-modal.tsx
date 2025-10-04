import { AtSign, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface InviteGuestModalProps {
  closeInviteGuestModal: () => void
}

export function InviteGuestModal({
  closeInviteGuestModal
}: InviteGuestModalProps) {
  const { tripId } = useParams()

  async function inviteGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    await api.post(`/trips/${tripId}/invites`, {
      email
    })

    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Convidar pessoa</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeInviteGuestModal} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Envie um convite por e-mail para alguém participar da viagem.
          </p>
        </div>
        
        <form onSubmit={inviteGuest} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="E-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              required
            />
          </div>

          <Button type="submit" size="full">
            Enviar convite
          </Button>
        </form>
      </div>
    </div>
  )
} 