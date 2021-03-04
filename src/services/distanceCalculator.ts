// @ts-check
import express from "express";
import axios from "axios";
import encodeUrl from "encodeurl";
import dotenv from "dotenv";
import querystring from "querystring";

dotenv.config();

const getAllDurationsInTrafficFromOrigin = async (
  addresses: string[],
  origin: string
) => {
  let url = "https://maps.googleapis.com/maps/api/distancematrix/json?";
  const destinationsStirng = addresses.join("|place_id:");
  const params = {
    origins: "place_id:" + origin,
    destinations: "place_id:" + destinationsStirng,
    key: process.env.googleAPIKey,
    traffic_model: "best_guess",
    departure_time: Date.now(),
  };
  const query = querystring.stringify(params);
  url = url.concat(query);
  try {
    const response = await axios.get(url);
    const responseData = response.data;
    const data: any = {
      [responseData.origin_addresses]: [],
    };
    console.log(data);
    var arrayLength = responseData.destination_addresses.length;
    console.log("responseData row elements", responseData.rows[0].elements[0]);
    for (var i = 0; i < arrayLength; i++) {
      data[origin].push({
        destination_address: responseData.destination_addresses[i],
        duration_in_traffic:
          responseData.rows[0].elements[i].duration_in_traffic,
        distance: responseData.rows[0].elements[i].distance,
      });
    }
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};

const getAllDurationsInTrafficFromAddressToAddressPromises = (
  addresses: string[]
) => {
    const data : any= {}
    addresses.forEach((address) => {
    let url = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    const destinationsString = addresses.join("|place_id:");
    const params = {
      origins: "place_id:" + address,
      destinations: "place_id:" + destinationsString,
      key: process.env.googleAPIKey,
      traffic_model: "best_guess",
      departure_time: Date.now(),
    };
    const query = querystring.stringify(params);
    url = url.concat(query);
    try {
      const response = axios.get(url);
      const responseData = response.data;
      var arrayLength = responseData.destination_addresses.length;
      data[responseData.origin_addresses] = [];
      for (var i = 0; i < arrayLength; i++) {
        data[responseData.origin_addresses].push({
          destination_address: responseData.destination_addresses[i],
          duration_in_traffic:
          responseData.rows[0].elements[i].duration_in_traffic,
          distance: responseData.rows[0].elements[i].distance,
        });
      }
    // promises.push(response)

    } catch (error) {
      console.error(error);
      return;
    }
});
return data;
};

const getAllIntermediateAddresses = (addresses: any) => {
  const intermediateAddresses = Object.keys(addresses);
  return intermediateAddresses;
};

const perm = (xs: any): any => {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
};

const finalisePermutations = (intermediatePermutations: any) => {
  intermediatePermutations.forEach((permutation: any) => {
    permutation.unshift("42A Oakdale Road");
    permutation.push("icco sake bar");
  });
  return intermediatePermutations;
};

const something2 = {
  "28 Hendon Avenue": [
    {
      destination_address: "1 godwit place",
      distance: 1320,
      duration: "6 mins",
    },
    {
      destination_address: "1 sommerset road",
      distance: 156,
      duration: "12 mins",
    },
    {
      destination_address: "royal oak kfc",
      distance: 134,
      duration: "5 mins",
    },
    {
      destination_address: "icco sake bar",
      distance: 123,
      duration: "16 mins",
    },
  ],
  "1 godwit place": [
    {
      destination_address: "28 Hendon Avenue",
      distance: 120,
      duration: "13 mins",
    },
    {
      destination_address: "1 sommerset road",
      distance: 156,
      duration: "10 mins",
    },
    {
      destination_address: "royal oak kfc",
      distance: 134,
      duration: "5 mins",
    },
    {
      destination_address: "icco sake bar",
      distance: 123,
      duration: "16 mins",
    },
  ],
  "1 sommerset road": [
    {
      destination_address: "28 Hendon Avenue",
      distance: 120,
      duration: "13 mins",
    },
    {
      destination_address: "1 godwit place",
      distance: 1056,
      duration: "10 mins",
    },
    {
      destination_address: "royal oak kfc",
      distance: 134,
      duration: "5 mins",
    },
    {
      destination_address: "icco sake bar",
      distance: 123,
      duration: "16 mins",
    },
  ],
  "royal oak kfc": [
    {
      destination_address: "28 Hendon Avenue",
      distance: 120,
      duration: "13 mins",
    },
    {
      destination_address: "1 godwit place",
      distance: 1056,
      duration: "10 mins",
    },
    {
      destination_address: "1 sommerset road",
      distance: 1034,
      duration: "5 mins",
    },
    {
      destination_address: "icco sake bar",
      distance: 123,
      duration: "16 mins",
    },
  ],
};

const calculateDurations = () => {
  const intermediateAddresses = getAllIntermediateAddresses(something2);
  const allPermutations = perm(intermediateAddresses);
  const finalisePermutation = finalisePermutations(allPermutations);
  // console.log(finalisePermutation)
  finalisePermutation.forEach((path: any) => {
    let cost = 0;
    for (let i = 0; i < path.length - 1; i++) {
      let costTo: any;
      if (i == 0) {
        // @ts-ignore
        costTo = something[path[i]].filter((obj: any) => {
          return obj.destination_address == path[i + 1];
        });
        costTo = costTo[0].distance;
        cost += costTo;
      } else {
        // @ts-ignore
        costTo = something2[path[i]].filter((obj: any) => {
          return obj.destination_address == path[i + 1];
        });
        costTo = costTo[0].distance;
        cost += costTo;
      }
    }
    console.log(path);
    console.log(cost);
    console.log("end of one loop my guy");
  });
};

const resolveAddressToAddressPromises = async (promises: any) => {
    const data :any = []
    for(let i = 0; i < promises.length; i++){
        promises[i].then((res :any) => {
            data.push(res)
            console.log(res)
        })
    }
}

// calculateDurations()
const someFn = async () => {
//   const durationsInTrafficFromOrigin = await getAllDurationsInTrafficFromOrigin(
//     [
//       "ChIJR8zzRztEDW0RgURQugqgZXc",
//       "ChIJpb_XUG9GDW0RHHjFeUfkyaI",
//       "ChIJ-_1UQ6ZIDW0RumOp-3Fqt2Q",
//       "ChIJ9VaVLcJGDW0R0Zjhcz3D76c",
//     ],
//     "ChIJcbl38nRGDW0RsRJ729jEPic"
//   );
//   console.log(durationsInTrafficFromOrigin);
  const durationToOtherAddresses = getAllDurationsInTrafficFromAddressToAddressPromises(["ChIJR8zzRztEDW0RgURQugqgZXc", "ChIJpb_XUG9GDW0RHHjFeUfkyaI", "ChIJ-_1UQ6ZIDW0RumOp-3Fqt2Q"])
  console.log(durationToOtherAddresses)
  const resolvePromises = resolveAddressToAddressPromises(durationToOtherAddresses)
  console.log(resolvePromises)
};

someFn();
