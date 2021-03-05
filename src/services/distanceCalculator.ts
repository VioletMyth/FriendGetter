// @ts-check
import express from "express";
import axios from "axios";
import encodeUrl from "encodeurl";
import dotenv from "dotenv";
import querystring from "querystring";

// dotenv.config();

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
    var arrayLength = responseData.destination_addresses.length;
    for (var i = 0; i < arrayLength; i++) {
      data[responseData.origin_addresses].push({
        destination_address: responseData.destination_addresses[i],
        duration_in_traffic:
          responseData.rows[0].elements[i].duration_in_traffic.value,
        distance: responseData.rows[0].elements[i].distance.value,
      });
    }
    return {
      durationsInTrafficFromOrigin: data,
      origin_address: responseData.origin_addresses[0]
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

const getAllDurationsInTrafficFromAddressToAddressPromises = async (
  addresses: string[]
) => {
  const data: any = {};
  let destination_address;
  for (let address of addresses) {
    // if (address == addresses[addresses.length - 1]) {
    //   destination_address = address
    //   break;
    // }
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
      const response = await axios.get(url);
      const responseData = response.data;
      data[responseData.origin_addresses] = [];
      const indexOfOriginAddress = responseData.destination_addresses.indexOf(
        responseData.origin_addresses[0]
      );
      if (indexOfOriginAddress > -1) {
        responseData.destination_addresses.splice(indexOfOriginAddress, 1);
        responseData.rows[0].elements.splice(indexOfOriginAddress, 1);
      }
      const arrayLength = responseData.destination_addresses.length;
      for (var i = 0; i < arrayLength; i++) {
        if (address == addresses[addresses.length - 1]) {
          delete data[responseData.origin_addresses]
          destination_address = responseData.origin_addresses[0]
          break;
        }
        data[responseData.origin_addresses].push({
          destination_address: responseData.destination_addresses[i],
          duration_in_traffic:
            responseData.rows[0].elements[i].duration_in_traffic.value,
          distance: responseData.rows[0].elements[i].distance.value,
        });
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }
  return {
    durationToOtherAddresses: data,
    destination_address: destination_address
  };
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

const finalisePermutations = (origin_address: string, intermediatePermutations: any, destination_address: string) => {
  intermediatePermutations.forEach((permutation: any) => {
    permutation.unshift(origin_address);
    permutation.push(destination_address);
  });
  return intermediatePermutations;
};

const calculateDurations = (finalisePermutation: any, durationsInTrafficFromOrigin: any, durationToOtherAddresses: any) : any => {
  const pathDurationDistanceArray : any= []
  finalisePermutation.forEach((path: any) => {
    let totalDistanceCost = 0;
    let totalDurationCost = 0;
    // console.log(path)
    let stringThing = "" ;
    for (let i = 0; i < path.length - 1; i++) {
      let costTo: any;
      let distanceCostTo: any;
      let durationCostTo: any;
      if (i == 0) {
        // @ts-ignore
        costTo = durationsInTrafficFromOrigin[path[i]].filter((obj: any) => {
          return obj.destination_address == path[i + 1];
        });
        // console.log(costTo)
        distanceCostTo = costTo[0].distance;
        durationCostTo = costTo[0].duration_in_traffic;
        //466
        stringThing = stringThing + "+" + durationCostTo.toString()
        // console.log("starting from origin",durationCostTo)
        totalDistanceCost += distanceCostTo;
        totalDurationCost += durationCostTo;
      } else {
        // @ts-ignore
        costTo = durationToOtherAddresses[path[i]].filter((obj: any) => {
          return obj.destination_address == path[i + 1];
        });
        distanceCostTo = costTo[0].distance;
        durationCostTo = costTo[0].duration_in_traffic;
        stringThing = stringThing + "+" + durationCostTo.toString()
        // console.log("address to address", durationCostTo)
        totalDistanceCost += distanceCostTo;
        totalDurationCost += durationCostTo;
      }
      // console.log(distanceCostTo)
    }
    // console.log(stringThing)
    pathDurationDistanceArray.push(
      {
        path: path,
        distanceCost: totalDistanceCost,
        durationCost: totalDurationCost
      }
    )
  })
  return pathDurationDistanceArray;
};

const getLowestDuration = (durationMatrix: {path:[], distanceCost: number, durationCost: number}[]) => {
  return durationMatrix.reduce((prev, current) => (prev.durationCost < current.durationCost) ? prev : current)
}
const someFn = async () => {
  const origin = "ChIJcbl38nRGDW0RsRJ729jEPic";
  const intermediateAddresses = [
    "ChIJR8zzRztEDW0RgURQugqgZXc",
    "ChIJpb_XUG9GDW0RHHjFeUfkyaI",
    "ChIJ-_1UQ6ZIDW0RumOp-3Fqt2Q",
    "ChIJ9VaVLcJGDW0R0Zjhcz3D76c",
  ];
  const finalDestination = "ChIJuTpUzK5HDW0R1OjdcOplzxk";
  // @ts-ignore
  const {durationsInTrafficFromOrigin, origin_address} = await getAllDurationsInTrafficFromOrigin(
    intermediateAddresses,
    origin
    );
  // @ts-ignore
  const {durationToOtherAddresses, destination_address} = await getAllDurationsInTrafficFromAddressToAddressPromises(
  intermediateAddresses.concat(finalDestination)
  );

  const allIntermediateAddresses = getAllIntermediateAddresses(
    durationToOtherAddresses
  );

  const allIntermediateAddressPermutations = perm(allIntermediateAddresses)
  const finalPermutations = finalisePermutations(origin_address, allIntermediateAddressPermutations, destination_address)
  const durationMatrix = calculateDurations(finalPermutations, durationsInTrafficFromOrigin, durationToOtherAddresses)
  const lowestDuration = getLowestDuration(durationMatrix)
  console.log(lowestDuration)
};

someFn();
