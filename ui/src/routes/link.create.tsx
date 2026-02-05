import { useState } from "react";
import type ReferralLink from "$/components/referral-link/ReferralLink";
import { createFileRoute, Link } from "@tanstack/react-router";
import ReferralLinkForm from "$/components/referral-link/ReferralLinkForm";

export const Route = createFileRoute("/link/create")({
  component: CreateReferralLink,
});

function CreateReferralLink() {
  const [referral] = useState<ReferralLink>({
    id: 0,
    title: "",
    description: "",
    referralUrl: "",
  });

  return (
    <div className="flex flex-col p-5 m-5 bg-gray-950 rounded-2xl">
      <Link to="/">Cancel</Link>
      <ReferralLinkForm context="CREATE" referralLinkItem={referral} />
    </div>
  );
}
