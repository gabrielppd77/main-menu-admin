import { useVersion } from "../hooks/useVersion";

export default function Version() {
  const { data } = useVersion();

  return <>{JSON.stringify(data || {})}</>;
}
