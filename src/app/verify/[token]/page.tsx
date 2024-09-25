import VerifyButton from "./VerifyButton";

type TProps = {
  params: {
    token: string;
  };
};
export default async function VerificationPage({ params }: TProps) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center space-y-2">
      <h1 className="text-4xl">Email Verification confirmation</h1>
      <VerifyButton token={params.token} />
    </div>
  );
}
