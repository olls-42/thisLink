
export default interface ReferralLink {
  id: number;
  title: string;
  description: string;
  referralUrl: string;
}

export interface ReferralLinkList {
  items: ReferralLink[],
  page: number,
  pageSize: number
}