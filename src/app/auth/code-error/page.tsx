export default async function AuthCodeErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const errorDesc = params["error_description"];
  const errorCode = params["error_code"];
  return (
    <div className="flex flex-col bg-card text-card-foreground rounded-xl shadow border p-6 gap-5 justify-around">
      <h1 className="text-xl font-semibold">Authentication Error</h1>
      <div>
        <p>{errorDesc ?? "Something went wrong when authenticate you."}</p>
        <p className="text-sm opacity-60">
          Code: {errorCode ?? "unknown_error"}
        </p>
      </div>
    </div>
  );
}
