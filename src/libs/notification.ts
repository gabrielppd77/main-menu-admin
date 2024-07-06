import { toast } from "react-toastify";

export function notifyCreate() {
  toast.success("Registro criado com sucesso");
}

export function notifyUpdate() {
  toast.success("Registro atualizado com sucesso");
}

export function notifyRemove() {
  toast.success("Registro removido com sucesso");
}
