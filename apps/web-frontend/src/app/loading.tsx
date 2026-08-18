import { LoadingState } from "@/components/ui/States";

export default function Loading() {
  return (
    <LoadingState 
      message="Loading..." 
      className="min-h-[calc(100vh-64px)]" 
    />
  );
}
