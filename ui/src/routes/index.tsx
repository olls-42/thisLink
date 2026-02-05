import { useEffect, useState } from "react";
import type ReferralLink from "$/components/referral-link/ReferralLink";
import {
  useDragAndDrop,
  useListData,
  type Selection,
} from "react-aria-components";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import {
  deleteLinkItem,
  fetchLinkItemList as fetchReferralList,
} from "$/storage/ReferralLinkStorage";
import { ListBox, ListBoxItem } from "$/components/base/ListBox";
import { Checkbox } from "$/components/base/Checkbox";
import { useQuery } from "@tanstack/react-query";
import { Button } from "$/components/base/Button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [referral, setReferral] = useState<ReferralLink | null>(null);
  // const [referrals, setReferrals] = useState<ReferralLink[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<ErrorMessage | null>(null);
  const [drawForm, setDrawForm] = useState<boolean>(false);
  const referralList = useListData<ReferralLink>({
    getKey: (i) => {
      return i.id;
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      const res = await fetchReferralList();
      // setReferrals(res.items)
      referralList.append(...res.items);

      return res;
    },
    refetchOnWindowFocus: false, // referral special kind of state with keys issue fix
  });

  /**
   * todo: add api endpoint and weight column with sorting
   */
  const { dragAndDropHooks } = useDragAndDrop({
    isDisabled: !drawForm,
    getItems: (keys, items: typeof referralList.items) =>
      items.map((item) => ({ "text/plain": item.title })),
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        referralList.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        referralList.moveAfter(e.target.key, e.keys);
      }
    },
  });

  const onSelectionChangeHandler = (e: Selection) => {
    const newSelect = data.items[e["currentKey"] - 1];

    if (referral && referral.id == newSelect.id) {
      setReferral(null);
      return;
    }

    setReferral(newSelect);
  };

  const handleDrawFormToggle = () => {
    setDrawForm((drawForm) => !drawForm);
  };

  const handleDelete = async () => {
    if (referral) {
      const res = await deleteLinkItem(referral);
      if (res) {
        setReferral(null);
        // cant remove ? need selected item key
        // referralList.remove()
        window.location.reload();
      }
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    // <div className="App">
    <div className="flex flex-col p-5 m-5 bg-gray-950 rounded-2xl">
      {isPending && <div>Loading...</div>}

      <Checkbox
        className={"p-5"}
        isSelected={drawForm}
        onChange={handleDrawFormToggle}
      >
        Allow reorder links
      </Checkbox>
      <div className="flex flex-row gap-3">
        <ListBox
          aria-label="Reorderable list"
          selectionMode="single"
          items={referralList.items}
          onSelectionChange={onSelectionChangeHandler}
          dragAndDropHooks={dragAndDropHooks}
        >
          {(item) => <ListBoxItem key={item.id}>{item.title}</ListBoxItem>}
        </ListBox>

        {referral && (
          <div className="text-left rounded-xl border-gray-700 border p-5">
            <ul>
              <li>id: {referral.id}</li>
              <li>title: {referral.title}</li>
              <li>url: {referral.referralUrl}</li>
            </ul>
            <Button variant="primary" className={"m-3"}>
              <Link to="/link/$id/edit" params={{ id: referral.id.toString() }}>
                Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="flex mt-5 flex-row justify-between gap-5">
        {drawForm ? (
          <Button variant="primary">Save order</Button>
        ) : (
          <Button variant="primary">
            <Link to="/link/create">Create new item</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
