import type ReferralLink from "$/components/referral-link/ReferralLink";

/**
 * todo: add types for data, also error messages  
 */
interface ErrorMessage {
  code: number;
  message: string;
}

export async function createLinkItem(
  item: ReferralLink,
  validateOnly: boolean = true,
) {
  const params = new URLSearchParams();

  if (validateOnly) {
    params.append("validate", "true");
  }

  return await fetch(
    "http://localhost:8000/referral-link?" + params.toString(),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    },
  )
    .then((response) => {
      // if (!response.ok) {
      //   throw new Error("Network response was not ok: " + response.statusText);
      // }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
}

export async function fetchLinkItem(id: string) {
  const response = await fetch(`http://localhost:8000/referral-link/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function updateLinkItem(item: ReferralLink): Promise<ReferralLink> {
  return await fetch(`http://localhost:8000/referral-link/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function deleteLinkItem(item: ReferralLink) {
  return await fetch(`http://localhost:8000/referral-link/${item.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


export async function fetchLinkItemList() {
  const response = await fetch(
    "http://localhost:8000/referral-link/list?page=1",
    {},
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}



export async function validate(input: ReferralLink) {
  return await fetch("http://localhost:8000/referral-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
