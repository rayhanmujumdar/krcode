"use client";

import { confirmVerify } from "@/actions/verification/confirmVerify";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function VerifyButton({ token }: { token: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const handleVerification = async () => {
    // Your verification logic here
    try {
      const response = await confirmVerify(token);
      if (response.success) {
        toast({
          variant: "default",
          description: response.message,
        });
        router.push("/");
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.message,
      });
    }
  };
  return (
    <Button onClick={handleVerification} variant={"secondary"}>
      Verify
    </Button>
  );
}
