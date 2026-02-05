import ReferralLinkForm from "$/components/referral-link/ReferralLinkForm";
import { fetchLinkItem } from "$/storage/ReferralLinkStorage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/link/$id/edit")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await fetchLinkItem(params.id);
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="flex flex-col p-5 m-5 bg-gray-950 rounded-2xl">
      <ReferralLinkForm context="UPDATE" referralLinkItem={data.item} />
    </div>
  );
}
