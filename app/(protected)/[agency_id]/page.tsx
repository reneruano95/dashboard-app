export default function AgencyPage({
  params,
}: {
  params: { agency_id: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-4xl font-bold text-center text-foreground/90">
        Welcome to the dashboard! of the agency {params.agency_id}
      </h1>
      <p className="text-center text-lg text-foreground/80">
        You are now signed in.
      </p>
    </div>
  );
}
