import { Button } from '$/components/base/Button';
import ReferralLinkForm from '$/components/referral-link/ReferralLinkForm';
import { fetchLinkItem } from '$/storage/ReferralLinkStorage';
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/link/$id/edit')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await fetchLinkItem(params.id)
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  useEffect(()=> {
    console.log(data)
  }, [data])

  return (
    <div className='flex flex-col p-5 m-5 bg-gray-950 rounded-2xl'>
      <ReferralLinkForm context="UPDATE" referralLinkItem={data.item} />
    </div>
  );
}
