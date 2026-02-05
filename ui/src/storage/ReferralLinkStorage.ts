import type ReferralLink from "$/components/referral-link/ReferralLink";

/**
 * todo: add types for data, also error messages
 */
interface ErrorMessage {
  code: number;
  message: string;
}

// todo extract to env

const endpointUrl = new URL("referral-link", "http://localhost:8000");
const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// todo: make error messages more consistent,
//       and divide to network and data errors in responses

export async function createLinkItem(
  item: ReferralLink,
  validateOnly: boolean = true,
) {
  const params = new URLSearchParams();

  if (validateOnly) {
    params.append("validate", "true");
  }

  const request = new Request(`${endpointUrl}?${params.toString()}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(item),
  });

  return await fetch(request)
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
  const request = new Request(`${endpointUrl}/${id}`, {
    method: "GET",
    headers: defaultHeaders,
  });

  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function updateLinkItem(
  item: ReferralLink,
): Promise<ReferralLink> {
  const request = new Request(`${endpointUrl}/${item.id}`, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(item),
  });

  return await fetch(request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function deleteLinkItem(item: ReferralLink) {
  const request = new Request(`${endpointUrl}/${item.id}`, {
    method: "DELETE",
    headers: defaultHeaders,
    body: JSON.stringify(item),
  });

  return await fetch(request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function fetchLinkItemList() {
  const params = new URLSearchParams();
  params.append("page", "1");

  const request = new Request(`${endpointUrl}/list?${params.toString()}`, {
    method: "GET",
    headers: defaultHeaders,
  });

  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function validate(input: ReferralLink) {
  const request = new Request(`${endpointUrl}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(input),
  });

  return await fetch(request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
